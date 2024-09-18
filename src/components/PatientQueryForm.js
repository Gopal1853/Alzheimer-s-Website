import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientQueryForm = () => {


  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    dateOfBirth: "",
    occupation: "",
    address: "",
    mobileNo: "",
    previousSurgery: "",
    medicalPrescription: "",
    chronicDisease: "",
    previousSurgeryDetails: "",
    medicalPrescriptionDetails: "",
    chronicDiseaseDetails: "",
    user: "" // Initialize userId

  });

  const {
    name,
    gender,
    age,
    dateOfBirth,
    occupation,
    address,
    mobileNo,
    previousSurgery,
    medicalPrescription,
    chronicDisease,
    previousSurgeryDetails,
    medicalPrescriptionDetails,
    chronicDiseaseDetails,
    user


  } = formData;

  const [showPreviousSurgeryDetails, setShowPreviousSurgeryDetails] = useState(false);
  const [showMedicalPrescriptionDetails, setShowMedicalPrescriptionDetails] = useState(false);
  const [showChronicDiseaseDetails, setShowChronicDiseaseDetails] = useState(false);

  const navigate = useNavigate();


  // Retrieve userId from localStorage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, user: storedUserId }));
    }
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "previousSurgery") {
      setShowPreviousSurgeryDetails(value === "yes");
    } else if (name === "medicalPrescription") {
      setShowMedicalPrescriptionDetails(value === "yes");
    } else if (name === "chronicDisease") {
      setShowChronicDiseaseDetails(value === "yes");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/patientquery", formData);
      alert("Patient query submitted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response.data);
      alert("Failed to submit the patient query. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pattern.png-100">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Patient Query Form
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={age}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                value={occupation}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={address}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                Mobile No
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="text"
                value={mobileNo}
                onChange={onChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="previousSurgery" className="block text-sm font-medium text-gray-700">
                Previous Surgery
              </label>
              <select
                id="previousSurgery"
                name="previousSurgery"
                value={previousSurgery}
                onChange={onDropdownChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {showPreviousSurgeryDetails && (
                <textarea
                  id="previousSurgeryDetails"
                  name="previousSurgeryDetails"
                  value={previousSurgeryDetails}
                  onChange={onChange}
                  placeholder="Please provide details about previous surgery"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
            <div>
              <label htmlFor="medicalPrescription" className="block text-sm font-medium text-gray-700">
                Medical Prescription
              </label>
              <select
                id="medicalPrescription"
                name="medicalPrescription"
                value={medicalPrescription}
                onChange={onDropdownChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {showMedicalPrescriptionDetails && (
                <textarea
                  id="medicalPrescriptionDetails"
                  name="medicalPrescriptionDetails"
                  value={medicalPrescriptionDetails}
                  onChange={onChange}
                  placeholder="Please provide details about medical prescription"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
            <div>
              <label htmlFor="chronicDisease" className="block text-sm font-medium text-gray-700">
                Any Chronic Disease
              </label>
              <select
                id="chronicDisease"
                name="chronicDisease"
                value={chronicDisease}
                onChange={onDropdownChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {showChronicDiseaseDetails && (
                <textarea
                  id="chronicDiseaseDetails"
                  name="chronicDiseaseDetails"
                  value={chronicDiseaseDetails}
                  onChange={onChange}
                  placeholder="Please provide details about any chronic disease"
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientQueryForm;
