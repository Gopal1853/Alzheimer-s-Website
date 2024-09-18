import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PatientQueryForm from "./components/PatientQueryForm";
import Quiz from "./components/quiz";
import  PatientQueriesPage from "./components/PatientQueriesPage"


const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-queries" element={<PatientQueriesPage />} />

        <Route path="/patientquaryform" element={<PatientQueryForm />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  </Router>
);

export default App;
