require('dotenv').config(); // Load environment variables
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const PatientQuery = require("../models/PatientQuerry");

const router = express.Router();

// Configure multer for file uploads with a size limit of 10MB
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

async function query(filename) {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      return { error: 'Uploaded file is empty' };
    }

    const data = fs.readFileSync(filePath);
    const { default: fetch } = await import('node-fetch');

    const retryLimit = 3;
    let attempts = 0;

    while (attempts < retryLimit) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-large-v3",
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`, // Using the env variable
            "Content-Type": "application/octet-stream",
          },
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      if (response.status === 503 && result.error && result.estimated_time) {
        const waitTime = Math.ceil(result.estimated_time) * 1000;
        await new Promise(resolve => setTimeout(resolve, waitTime));
        attempts += 1;
      } else if (response.status === 200 && result.text) {
        return { text: result.text };
      } else {
        return { error: result.error || 'Audio processing failed' };
      }
    }

    return { error: 'Model did not load after several attempts' };
  } catch (error) {
    return { error: error.message || 'Audio processing failed' };
  }
}

// POST API for submitting the quiz
router.post('/', upload.any(), async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const answers = [];
    const convertedTexts = [];

    for (const key in req.body) {
      if (key.startsWith('answer_question_')) {
        const index = key.match(/question_(\d+)/)[1];
        const audioFile = req.files.find(
          (file) => file.fieldname === `audioFile_question_${index}`
        )?.filename || null;

        let convertedText = null;
        if (audioFile) {
          const response = await query(audioFile);
          convertedText = response.text || response.error || "Audio processing failed";
          convertedTexts.push(convertedText);
        } else {
          convertedTexts.push("No audio file uploaded");
        }

        answers[index - 1] = {
          answer: req.body[key],
          audioFile: audioFile,
          convertedText: convertedText,
        };
      }
    }

    const quiz = new Quiz({ user: user._id, answers });
    await quiz.save();

    const patientQuery = await PatientQuery.findOne({ user: user._id });
    if (patientQuery) {
      patientQuery.quizAnswers.push(quiz._id);
      await patientQuery.save();
    } else {
      return res.status(400).json({ error: 'Patient query not found' });
    }

    res.status(200).json({
      message: 'Quiz submitted and linked to patient query successfully!',
      convertedTexts: convertedTexts,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting quiz' });
  }
});

module.exports = router;
