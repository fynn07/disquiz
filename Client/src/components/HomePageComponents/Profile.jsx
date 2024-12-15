import learn from "../../assets/learn.png";
import { useEffect, useState } from "react";
import { getQuizzesByAuthor, getUser } from "../../services/api";
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const id = parseInt(localStorage.getItem("userID"), 10)

  const colors = ["bg-blue-600", "bg-green-600", "bg-red-600", "bg-indigo-600", "bg-yellow-600"];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzesByAuthor(id);
        if (data.error) {
          toast.error("Failed to fetch quizzes.");
        } else {
          setQuizzes(data);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("An error occurred while fetching quizzes.");
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await getUser(id);
        if (data.error) {
          toast.error("Failed to fetch User.");
        } else {
          setFirstName(data.firstName);
          setLastName(data.lastName);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
        toast.error("An error occurred while fetching quizzes.");
      } 
    };
    fetchName();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-md max-w-7xl mx-auto mt-16">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <img
              src={learn}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold flex">{firstName} {lastName}</h1>
              <p className="text-gray-400 text-sm">Level 1</p>
            </div>
          </div>


          <div className="mt-8">
            <h2 className="text-xl font-semibold">My Quizzes:</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {quizzes.map((quiz, idx) => (
                <div key={idx} className={`group relative flex flex-col justify-between items-center p-4 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer ${colors[idx % colors.length]}`}>
                  <h3 className="text-lg font-bold text-center mb-4">{quiz.quizName}</h3>
                  <p className="mb-4 font-bold">True or False</p>
                  <p className="mb-4 border-2 text-center p-4">{quiz.quizDescription}</p>
                  <p>Created By:</p>
                  <p className="font-bold">{firstName} {lastName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 ml-24">
          <h2 className="text-xl font-semibold">Reminders</h2>
          <ul className="mt-4 space-y-4">
            {[
              { title: "Control Your Account", due: "Due Today" },
              { title: "Clear Desk Policy", due: "Due Next Week" },
              { title: "Quiz #1", due: "Due Next Week" },
              { title: "Use of Flash Drive", due: "Due October 20" },
            ].map((reminder, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-red-600 p-4 rounded-lg border border-gray-700 shadow-md"
              >
                <span>{reminder.title}</span>
                <span className="text-gray-400 text-sm">{reminder.due}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
