import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientQueriesList = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patientquery");
        setQueries(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Patient Queries
        </h2>
        {queries.length === 0 ? (
          <p className="text-center text-gray-700">No patient queries found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Mobile No</th>
                <th className="border px-4 py-2">Other Details</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr key={query._id}>
                  <td className="border px-4 py-2">{query.name}</td>
                  <td className="border px-4 py-2">{query.gender}</td>
                  <td className="border px-4 py-2">{query.age}</td>
                  <td className="border px-4 py-2">{query.address}</td>
                  <td className="border px-4 py-2">{query.mobileNo}</td>
                  <td className="border px-4 py-2">{query.otherDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientQueriesList;
