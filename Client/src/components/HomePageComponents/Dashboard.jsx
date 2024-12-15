import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getQuizzes, getUser } from "../../services/api";
import { toast } from 'react-hot-toast';

const Cards = ({ title, description, bgColor, author, onClick }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const data = await getUser(author);
        if (data.error) {
          toast.error("Failed to fetch User.");
        } else {
          console.log(data)
          setFirstName(data.firstName);
          setLastName(data.lastName);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
        toast.error("An error occurred while fetching quizzes.");
      } 
    };

    fetchName();
  }, [author]);

  return (
    <div
      className={`group relative flex flex-col justify-between items-center p-4 ${bgColor} shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      <h3 className="text-lg font-bold text-center mb-4">{title}</h3>
      <p className=" mb-4 font-bold">True or False</p>
      <p className=" mb-4 border-2 text-center p-4">{description}</p>
      <p className="">Created By:</p>
      <p className="font-bold">{firstName} {lastName}</p>
    </div>
  );
};

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = ["bg-blue-600", "bg-green-600", "bg-red-600", "bg-indigo-600", "bg-yellow-600"];

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        if (data.error) {
          toast.error("Failed to fetch quizzes.");
        } else {
          setQuizzes(data);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        toast.error("An error occurred while fetching quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleCardClick = (path, questions) => {
    
    navigate(path, { state: { questions } });
  };

  if (loading) {
    return <div className="p-6 min-h-screen">Loading quizzes...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-4xl font-semibold mb-4">Explore</h2>
      <div className="grid grid-cols-4 gap-6 w-full h-full">
        {quizzes.map((quiz, index) => (
          <Cards
            key={index}
            title={quiz.quizName}
            description={quiz.quizDescription}
            bgColor={colors[index % colors.length]} // Assign dynamic colors based on the index
            author={quiz.quizAuthorId}
            onClick={() => handleCardClick(`/tf-quiz`, quiz.quizQuestions)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;