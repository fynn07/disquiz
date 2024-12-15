import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginUser } from '../services/api';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle login API call
  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }

    // Call the loginUser function and pass the email and password
    try {
      const data = await loginUser(email, password);

      // If login is successful, navigate to the homepage with the selected tab state
      if (data) {
        toast.success("Logged In Successfully!");
        localStorage.setItem("userID", data.id)
        console.log(data)
        navigate('/homepage', { state: { selectedTab: 'dashboard' } });
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <label className="text-lg font-medium text-black">Email</label>
        <input
          className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-medium text-black">Password</label>
        <input
          className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleSignIn}
          className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all duration-200"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Form;
