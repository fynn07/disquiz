import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { signupUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const FormSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("You must accept the Terms of Use & Privacy Policy.");
      return;
    }

    // Call the signupUser function
    try {
      const result = await signupUser(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      if (result && !result.error) {
        // Redirect or take other actions on success
        navigate('/login');
        toast.success("Registration successful!");
        
        // Optionally, redirect or clear form fields
      }
    } catch (error) {
      console.error("Error during signup", error);
      console.log(error)
      toast.error("An error occurred while registering.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="text-base font-medium text-black">First Name</label>
          <input
            className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your first name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1">
          <label className="text-base font-medium text-black">Last Name</label>
          <input
            className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your last name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-base font-medium text-black">Email</label>
        <input
          className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-base font-medium text-black">Password</label>
        <input
          className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label className="text-base font-medium text-black">Confirm Password</label>
        <input
          className="w-full border-2 rounded-lg p-4 mt-2 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center pb-5">
        <input
          type="checkbox"
          className="mr-2"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
        />
        <label className="text-sm text-gray-500">
          I accept the{' '}
          <span className="text-blue-500 hover:underline">
            Terms of Use & Privacy Policy
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold text-base hover:bg-blue-600 transition-all duration-200"
      >
        Register Now
      </button>
    </form>
  );
};

export default FormSignUp;
