import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TFQuiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Default to an empty array if no questions were passed
  const questions = state?.questions || [];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0); // Track the score

  const handleAnswer = (answer) => {
    const isCorrect = answer === questions[questionIndex]?.answer;
    if (isCorrect) setScore((prevScore) => prevScore + 1); // Increment score if the answer is correct

    setSelectedAnswer(answer);
    setTimeout(() => {
      setSelectedAnswer(null);
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const goBackToDashboard = () => {
    navigate("/homepage"); // Adjust the path as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 relative">
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md transform hover:scale-105"
        onClick={goBackToDashboard}
      >
        Back to Homepage
      </button>

      <div className="bg-gray-800 shadow-2xl rounded-xl p-8 w-full max-w-3xl">
        {quizCompleted ? (
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-green-400 mb-4">Quiz Completed!</h1>
            <p className="text-lg text-gray-300 mb-6">
              You answered <span className="text-yellow-400">{score}</span> out of{" "}
              <span className="text-yellow-400">{questions.length}</span> correctly.
            </p>
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transform hover:scale-105"
              onClick={goBackToDashboard}
            >
              Back to Homepage
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-center text-yellow-400 mb-6">
              True or False Quiz
            </h1>
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-white">
                Question {questionIndex + 1} of {questions.length}
              </p>
              <p className="text-xl font-medium text-gray-300 mt-4">
                {questions[questionIndex]?.question}
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              <button
                className={`px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 ${
                  selectedAnswer === "True" && "ring-4 ring-green-300"
                }`}
                onClick={() => handleAnswer("True")}
                disabled={quizCompleted}
              >
                True
              </button>
              <button
                className={`px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 ${
                  selectedAnswer === "False" && "ring-4 ring-red-300"
                }`}
                onClick={() => handleAnswer("False")}
                disabled={quizCompleted}
              >
                False
              </button>
            </div>

            {selectedAnswer && (
              <div
                className={`mt-6 text-center font-medium ${
                  selectedAnswer === questions[questionIndex]?.answer
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {selectedAnswer === questions[questionIndex]?.answer ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FaCheckCircle />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FaTimesCircle />
                    <span>Incorrect!</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md transform hover:scale-105 disabled:opacity-50"
                onClick={() => setQuestionIndex((prev) => Math.max(prev - 1, 0))}
                disabled={questionIndex === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md transform hover:scale-105 disabled:opacity-50"
                onClick={() => setQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                disabled={questionIndex === questions.length - 1}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TFQuiz;
