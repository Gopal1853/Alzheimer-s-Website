import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { "x-auth-token": token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-pattern.png">
      <nav className="bg-indigo-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            {user.role === "patient" ? (
              <>
                <button
                  onClick={() => navigate("/patientquaryform")}
                  className="text-white hover:text-gray-200"
                >
                  Patient Form
                </button>
                <button
                  onClick={() => navigate("/quiz")}
                  className="text-white hover:text-gray-200"
                >
                  Quiz
                </button>
              </>
            ) : user.role === "doctor" ? (
              <button
                onClick={() => navigate("/patient-queries")}
                className="text-white hover:text-gray-200"
              >
                View Patient Queries
              </button>
            ) : null}
          </div>
          <div className="relative">
            <FaUserCircle
              className="w-16 h-16 text-white cursor-pointer"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4 flex justify-end">
        <div id="google_translate_element"></div>
      </div>
      <div className="container mx-auto p-8">
        {user.role === "patient" ? (
          <PatientDashboard user={user} />
        ) : user.role === "doctor" ? (
          <DoctorDashboard user={user} />
        ) : null}
      </div>
    </div>
  );
};

const PatientDashboard = ({ user }) => (
  <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded shadow-lg mx-auto">
    <div className="flex items-center space-x-4">
      <div>
        <h1 className="text-3xl font-bold text-black-900">
          Welcome, {user.name}
        </h1>
        <p className="text-xl text-white-600">Role: {user.role}</p>
      </div>
    </div>
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-white-800">Dashboard</h2>
      <p className="mt-2 font-bold text-white-600">
        This is your dashboard where you can manage your profile and other
        settings.
      </p>
      <p>Please read the following instructions before starting the quiz:</p>
      <ul>
        <li>
          1) You can read the question and can also listen to the audio format
          of the question.
        </li>
        <li>
          2) You are instructed to speak through the microphone to give your
          appropriate answer.
        </li>
        <li>
          3) Once you have answered the question, you are requested to click the
          next question button and at last click the submit button.
        </li>
        <li>4) Follow the below flowchart for better understanding.</li>
      </ul>
      <img
        src="dashboard.png"
        alt="Dashboard Image"
        className="w-full mt-6 rounded-lg shadow-md"
      />
    </div>
  </div>
);

const DoctorDashboard = ({ user }) => (
  <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded shadow-lg mx-auto">
    <div className="flex items-center space-x-4">
      <div>
        <h1 className="text-3xl font-bold text-black-900">
          Welcome, {user.name}
        </h1>
        <p className="text-xl text-white-600">Role: {user.role}</p>
      </div>
    </div>
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-white-800">Dashboard</h2>
      <p className="mt-2 font-bold text-white-600">
        As a doctor, you can view and manage patient queries.
      </p>
    </div>
  </div>
);

export default Dashboard;
