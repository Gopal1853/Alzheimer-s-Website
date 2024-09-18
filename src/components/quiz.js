import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import MicRecorder from "mic-recorder-to-mp3";
import { useNavigate } from "react-router-dom"; // To enable navigation

const recorder = new MicRecorder({ bitRate: 128 });

const Quiz = () => {
  const questions = [
    {
      question : "Please state the current day and date, click the record button to record your response.தற்போதைய நாள் மற்றும் தேதியைக் குறிப்பிடவும், உங்கள் பதிலைப் பதிவு செய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 1.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 1.mp3", // Path to your English audio file
    },
    {
      question: "Please specify the current season, click the record button to record your response.தற்போதைய பருவத்தைக் குறிப்பிடவும், உங்கள் பதிலைப் பதிவுசெய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 2.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 2.mp3", // Path to your English audio file
    },

    {
      question: "Is it Morning, Evening or Night right now, click the record button to record your response. இப்போது காலையா, மாலையா அல்லது இரவா, உங்கள் பதிலைப் பதிவுசெய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 3.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 3.mp3", // Path to your English audio file
    },
    {
      question: "What is or was your occupation and where did or do you work, click the record button to record your response.உங்கள் தொழில் என்ன அல்லது இருந்தது மற்றும் நீங்கள் எங்கு வேலை செய்தீர்கள் அல்லது செய்தீர்கள், உங்கள் பதிலை பதிவு செய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 4.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 4.mp3", // Path to your English audio file
    },
    {
      question: "How many Children do you have? Can you name them?, click the record button to record your response.உங்களுக்கு எத்தனை குழந்தைகள் உள்ளனர்? நீங்கள் அவர்களுக்கு பெயரிட முடியுமா?, உங்கள் பதிலை பதிவு செய்ய பதிவு பொத்தானை கிளிக் செய்யவும்.",
      audio1: "Tamil ques 5.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 5.mp3", // Path to your English audio file
    },
    {
      question: "Where are you right now? Can you describe your surroundings?, click the record button to record your response. நீங்கள் இப்போது எங்கே இருக்கிறீர்கள்? உங்கள் சூழலை விவரிக்க முடியுமா?, உங்கள் பதிலைப் பதிவு செய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 6.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 6.mp3", // Path to your English audio file
    },
    {
      question: "Can you name the days of the week in order both forwards and backwards, click the record button to record your response. வாரத்தின் நாட்களை முன்னோக்கி மற்றும் பின்தங்கிய வரிசையில் பெயரிட முடியுமா உங்கள் பதிலை பதிவு செய்ய பதிவு பொத்தானை கிளிக் செய்யவும்.",
      audio1: "Tamil ques 7.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 7.mp3", // Path to your English audio file
    },
    {
      question: "Can you tell the current year? Name one next and previous year from the current year, click the record button to record your response. நடப்பு ஆண்டு சொல்ல முடியுமா? நடப்பு ஆண்டிலிருந்து அடுத்த மற்றும் முந்தைய ஆண்டு ஒன்றைப் பெயரிடவும், உங்கள் பதிலைப் பதிவு செய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 8.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 8.mp3", // Path to your English audio file
    },
    {
    question: "Do you have any illness and disease? click the record button to record your response. உங்களுக்கு ஏதேனும் நோய் மற்றும் நோய் இருக்கிறதா? உங்கள் பதிலை பதிவு செய்ய பதிவு பொத்தானை கிளிக் செய்யவும்.",
    audio1: "Tamil ques 9.mpeg.mp3",  // Path to your Tamil audio file
    audio2: "English ques 9.mp3", // Path to your English audio file    
    },

    {
      question: "Please identify the colour given below, click the record button to record your response. கீழே கொடுக்கப்பட்டுள்ள நிறத்தைக் கண்டறிந்து, உங்கள் பதிலைப் பதிவுசெய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 10.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 10.mp3", // Path to your English audio file
      images: ["green.png","red.png","yellow.png",]
    },
    {
      question: "Please identify the images given below, click the record button to record your response. கீழே கொடுக்கப்பட்டுள்ள படங்களைக் கண்டறிந்து, உங்கள் பதிலைப் பதிவுசெய்ய பதிவு பொத்தானைக் கிளிக் செய்யவும்.",
      audio1: "Tamil ques 11.mpeg.mp3",  // Path to your Tamil audio file
      audio2: "English ques 11.mp3", // Path to your English audio file
      images: ["cat.jpg","cow.png","dog.png","car.png","pot.png",]
    }

  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(questions.map(() => ({ answer: "", audioFile: null })));
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for submission
  const [timer, setTimer] = useState(0);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const timerRef = useRef(null);
  const audioRef = useRef(new Audio());
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleStartRecording = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
    }

    recorder.start().then(() => {
      SpeechRecognition.startListening({ continuous: true });
      setIsRecording(true);
    }).catch((error) => console.error("Error starting recorder:", error));
  };

  const handleStopRecording = () => {
    recorder.stop().getMp3().then(([buffer, blob]) => {
      const audioFile = new File(buffer, `${uuidv4()}.mp3`, { type: "audio/mp3" });
      setAnswers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = { answer: transcript, audioFile };
        return updated;
      });
      resetTranscript();
      setIsRecording(false);
    }).catch((error) => console.error("Error stopping recorder:", error));
  };

  const handlePlayAudio = (audioSrc) => {
    if (isRecording) {
      handleStopRecording();
    }
    if (audioRef.current.src !== audioSrc) {
      audioRef.current.src = audioSrc;
    }
    audioRef.current.play();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

const handleSubmitQuiz = async () => {
  const formData = new FormData();
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  formData.append("userId", userId); // Add user ID to the form data

  answers.forEach((answer, index) => {
    if (answer.audioFile) {
      formData.append(`audioFile_question_${index + 1}`, answer.audioFile);
      formData.append(`answer_question_${index + 1}`, answer.answer);
    }
  });

  setLoading(true); // Set loading to true to show the waiting message

  try {
    const response = await axios.post("http://localhost:5000/api/submit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Quiz submitted:", response.data);
    alert("Quiz successfully submitted!");

    // Reset loading to false before navigating to the dashboard
    setLoading(false); 

    // Reset the quiz after submission
    setCurrentQuestionIndex(0);
    setAnswers(questions.map(() => ({ answer: "", audioFile: null })));

    // Navigate to the dashboard after submission
    navigate("/dashboard");
  } catch (error) {
    console.error("Error submitting quiz", error);
    setLoading(false); // Turn off loading if there's an error
    alert("There was an error submitting the quiz. Please try again.");
  }
};
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        {loading ? ( // Show loading message if loading is true
          <p className="text-2xl text-gray-700 mb-6">
            Please wait until your response is getting processed...
          </p>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
              Question {currentQuestionIndex + 1}
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              {questions[currentQuestionIndex].question}
            </p>
            <button
              onClick={() => handlePlayAudio(questions[currentQuestionIndex].audio1)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150 mb-4"
            >
              Play Tamil Audio
            </button>
            <button
              onClick={() => handlePlayAudio(questions[currentQuestionIndex].audio2)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-150 mb-4"
            >
              Play English Audio
            </button>
          {/* Render images if available */}
          {questions[currentQuestionIndex].images && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                {questions[currentQuestionIndex].images.map((image, idx) => (
                  <img
                    key={idx}
                    src={`${image}`} // Assuming images are stored in the public/images folder
                    alt={`Question ${currentQuestionIndex + 1} Image ${idx + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            )}
            <div className="flex flex-col gap-4 mb-6">
              <button
                onClick={handleStartRecording}
                disabled={isRecording}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150"
              >
                Start Recording
              </button>
              <button
                onClick={handleStopRecording}
                disabled={!isRecording}
                className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-150"
              >
                Stop Recording
              </button>
            </div>
            <div className="flex gap-4 mb-6">
              <button
                onClick={handlePreviousQuestion}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-150"
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next Question
              </button>
            </div>
            {isRecording && (
              <p className="text-gray-700 mt-4 text-lg">
                Recording Time: {formatTime(timer)}
              </p>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <div className="mt-6">
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-150"
                >
                  Submit Quiz
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
