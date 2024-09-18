import React, { useState } from 'react';

const PatientQueriesTable = ({ queries }) => {
  const [selectedQuery, setSelectedQuery] = useState(null); // State to store selected query for viewing responses

  const handleViewResponses = (query) => {
    setSelectedQuery(query); // Set the selected query to display the responses
  };

  const closeModal = () => {
    setSelectedQuery(null); // Close the modal or hide the responses section
  };

  const handleDownloadResponses = () => {
    if (!selectedQuery) return;

    // Generate text content for download
    const responseText = selectedQuery.quizAnswers
      .map((answer, index) =>
        answer.answers
          .map(
            (a, idx) =>
              `Question ${(idx % 11) + 1}:\n${a.convertedText}\n`
          )
          .join('\n')
      )
      .join('\n');

    // Create a blob from the text and generate a downloadable link
    const blob = new Blob([responseText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedQuery.name}_quiz_responses.txt`;
    link.click();
  };

  if (!queries || queries.length === 0) {
    return <div className="mt-6 text-center">No data available</div>;
  }

  return (
    <div className="mt-6">
      <table className="min-w-full mt-4 bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">ID</th>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">Gender</th>
            <th className="border-b px-4 py-2 text-left">Age</th>
            <th className="border-b px-4 py-2 text-left">Date of Birth</th>
            <th className="border-b px-4 py-2 text-left">Occupation</th>
            <th className="border-b px-4 py-2 text-left">Address</th>
            <th className="border-b px-4 py-2 text-left">Mobile No</th>
            <th className="border-b px-4 py-2 text-left">Previous Surgery</th>
            <th className="border-b px-4 py-2 text-left">Medical Prescription</th>
            <th className="border-b px-4 py-2 text-left">Chronic Disease</th>
            <th className="border-b px-4 py-2 text-left">Quiz Responses</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query._id}>
              <td className="border-b px-4 py-2">{query._id}</td>
              <td className="border-b px-4 py-2">{query.name}</td>
              <td className="border-b px-4 py-2">{query.gender}</td>
              <td className="border-b px-4 py-2">{query.age}</td>
              <td className="border-b px-4 py-2">{new Date(query.dateOfBirth).toLocaleDateString()}</td>
              <td className="border-b px-4 py-2">{query.occupation}</td>
              <td className="border-b px-4 py-2">{query.address}</td>
              <td className="border-b px-4 py-2">{query.mobileNo}</td>
              <td className="border-b px-4 py-2">{query.previousSurgery}</td>
              <td className="border-b px-4 py-2">{query.medicalPrescription}</td>
              <td className="border-b px-4 py-2">{query.chronicDisease}</td>
              <td className="border-b px-4 py-2">
                <button
                  onClick={() => handleViewResponses(query)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Quiz Responses
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for viewing quiz responses */}
      {selectedQuery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-lg w-full max-w-lg max-h-full">
            <div className="p-6 overflow-y-auto max-h-96">
              {/* Limit height and add scroll */}
              <h2 className="text-2xl font-bold mb-4">
                Quiz Responses for {selectedQuery.name}
              </h2>
              {selectedQuery.quizAnswers.map((answer, index) => (
                <div key={index}>
                  {answer.answers.map((a, idx) => (
                    <div key={a._id} className="mb-4">
                      {/* Loop through 1 to 11 for the question number */}
                      <h3 className="font-semibold">Question {(idx % 11) + 1}:</h3>
                      <p className="text-gray-700">{a.convertedText}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Download button */}
            <div className="flex justify-between p-4 border-t">
              <button
                onClick={handleDownloadResponses}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Download Responses
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientQueriesTable;
