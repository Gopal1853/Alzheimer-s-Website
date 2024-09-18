const express = require("express");
const router = express.Router();
const PatientQuery = require("../models/PatientQuerry");
const User = require('../models/User'); // Import User model


// POST request to add a new patient query
router.post("/", async (req, res) => {
  try {
    // Check if user ID is provided
    if (!req.body.user) {
      return res.status(400).json({
        error: "Validation error",
        details: "User ID is required"
      });
    }

    // Create a new PatientQuery instance with the request body
    const newQuery = new PatientQuery(req.body);

    // Save the new query to the database
    await newQuery.save();

    // Respond with a success message and the submitted data
    res.status(201).json({
      message: "Patient query submitted successfully",
      data: newQuery
    });
  } catch (err) {
    // Respond with an error message if something goes wrong
    res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
});























router.get("/", async (req, res) => {
  try {
    // Fetch patient queries and populate quiz answers
    const queries = await PatientQuery.find()
      .populate('user')          // Populate user details
      .populate({
        path: 'quizAnswers',
        populate: {
          path: 'answers',
          model: 'Quiz'  // Populate the quiz answers from Quiz model
        }
      });

    res.status(200).json({
      data: queries,  // Return patient queries with linked quizzes
    });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
});



module.exports = router;
