const mongoose = require("mongoose");

const PatientQuerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true }, // Changed to Date type for better handling of dates
  occupation: { type: String, required: true },
  address: { type: String, required: true },
  mobileNo: { type: String, required: true },
  previousSurgery: { type: String, enum: ['yes', 'no'], required: true },
  medicalPrescription: { type: String, enum: ['yes', 'no'], required: true },
  chronicDisease: { type: String, enum: ['yes', 'no'], required: true },
  previousSurgeryDetails: { type: String },
  medicalPrescriptionDetails: { type: String },
  chronicDiseaseDetails: { type: String },
  quizAnswers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],

  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  
  
});

module.exports = mongoose.model("PatientQuery", PatientQuerySchema);
