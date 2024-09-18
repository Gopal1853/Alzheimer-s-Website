const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
  doctorNumber: {
    type: String,
    unique: true,
    sparse: true, // Add this line
  },
});

// Ensure that `doctorNumber` is only validated for doctors
UserSchema.pre("save", function (next) {
  if (this.role === "patient") {
    this.doctorNumber = undefined; // Clear the field for patients
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
