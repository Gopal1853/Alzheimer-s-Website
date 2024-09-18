// models/Quiz.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [
    {
      answer: String,
      audioFile: String,
      convertedText: String, 
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
