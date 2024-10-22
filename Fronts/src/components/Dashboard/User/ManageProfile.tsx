import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("userData");
      const token = localStorage.getItem("authToken"); 
      if (userData && token) {
        const user = JSON.parse(userData);
        try {
          const response = await axiosInstance.get(`/users/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
          });

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
        const response = await axiosInstance.put(`/users/${user._id}`, formData, {
          headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        });
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
    if (userData) {
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

  return (
    <div>
      <h2>Manage Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="mt-1 block w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
          </div>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleDeleteAccount} style={{ marginTop: '20px', color: 'red' }}>
        Delete Account
      </button>
    </div>
  );
};

export default ManageProfile;