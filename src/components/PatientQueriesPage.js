// PatientQueriesPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientQueriesTable from "./PatientQueriesTable";

const PatientQueriesPage = () => {
  const [patientQueries, setPatientQueries] = useState([]);
  const navigate = useNavigate(); // Use the hook to navigate

  useEffect(() => {
    const fetchPatientQueries = async () => {
      try {
        const token = localStorage.getItem("token");
        const queriesRes = await axios.get("http://localhost:5000/api/patientquery", {
          headers: { "x-auth-token": token },
        });
        setPatientQueries(queriesRes.data.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchPatientQueries();
  }, []);

  const handleGoBack = () => {
    navigate("/dashboard"); // Navigate back to the dashboard page
  };

  return (
    <div>
      <button onClick={handleGoBack} style={styles.goBackButton}>Go Back</button>
      <div>
        <PatientQueriesTable queries={patientQueries} />
      </div>
    </div>
  );
};

// Optional inline styles for the button
const styles = {
  goBackButton: {
    padding: "10px 20px",
    backgroundColor: "cyan",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  }
};

export default PatientQueriesPage;
