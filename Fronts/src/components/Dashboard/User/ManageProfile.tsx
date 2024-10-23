import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import Button from '../../Shared/Button';
import { FaEye, FaEyeSlash } from "react-icons/fa";


const ManageProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("authToken"); 
      if (userData && token) {
        const user = JSON.parse(userData);
        try {
          const response = await axiosInstance.get(`/users/${user._id}`);

          const formattedDateOfBirth = new Date(response.data.dateOfBirth).toISOString().split('T')[0];

          setFormData({
            ...response.data,
            dateOfBirth: formattedDateOfBirth,});
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const userData = localStorage.getItem("userData");
     const token = localStorage.getItem("authToken"); 
    if (userData && token) {
      const user = JSON.parse(userData);
      try {
        const response = await axiosInstance.put(`/users/${user._id}`, formData);
        setMessage('Profile updated successfully');
        localStorage.setItem("userData", JSON.stringify(response.data.updatedUser));
      } catch (error) {
        console.error('Error updating profile:', error);
        setMessage('Error updating profile');
      }
    }
  };

  const handleDeleteAccount = async () => {
    
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("authToken");
    if (userData && token) {
      try {
        await axiosInstance.delete('/users/me');
        localStorage.removeItem("userData");
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting account:', error);
        setMessage('Error deleting account');
      }
    }
  };

  const togglePasswordVisibility = () => {
  setPasswordVisible(!passwordVisible);
};

  return (
    <>
    <div className="flex justify-center mt-2 px-8">
      {message && <p>{message}</p>}
      <form className="max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-wrap border shadow rounded-lg px-8 bg-glass">
          <h2 className="text-xl text-primaryText dark:text-formPrimaryText-300 pb-2">Profile Update:</h2>

      <div className="flex flex-col gap-2 w-full border-gray-400">
        <div>

          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="first_name">First Name</label>
          <input
            className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="email">Email</label>
          <input
                className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="dateOfBirth">Date of Birth</label>
          <input
                className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="currentPassword" 
          >Current Password</label>
          <input
            className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
                type={passwordVisible ? "text" : "password"}
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <button
    type="button"
    onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent border-transparent"
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
          </div>


        <div className="relative">
          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="password">New Password</label>
          <input
                className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
                type={passwordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        <button
    type="button"
    onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent border-transparent"
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
          </div>


        <div className="relative">
          <label className="text-primaryText dark:text-formPrimaryText-400" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-formPrimaryText-100"
                type={passwordVisible ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        <button
    type="button"
    onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-2 bg-transparent border-transparent"
  >
    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
  </button>
          </div>

        
        <div className="flex justify-end">
          <div className=' py-1.5 px-3 m-1'>
                      <Button text="Update Profile" type="submit" />

          </div>
      </div>
      </div>
      </div>
      <div className="mt-4 text-red-600">
      <Button text="Delete Account" onClick={handleDeleteAccount} type="submit" />
      </div>
      </form>  
    </div>
    </>
  );
};

export default ManageProfile;