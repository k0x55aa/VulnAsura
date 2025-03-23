'use client'; // Marking this as a client-side component

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from './LoginComponent';

interface FormData {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState<string>('');  // State for errors
  const [loading, setLoading] = useState<boolean>(false);  // State for loading spinner or UI feedback
  const navigate = useNavigate(); // Hook for navigation (React Router v6+)

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Clear any previous error messages
    setLoading(true); // Set loading state to true

    const { username, password } = formData;

    // Basic client-side validation
    if (!username || !password) {
      setError('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      // Send POST request to the backend for login
      const response = await fetch('http://127.0.0.1:8080/auth/login', {  // Adjust the URL to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Extract the Authorization token from the response header
      const token = response.headers.get("Authorization")
      
      if (token) {
        localStorage.setItem('authToken', token);  // Save token to localStorage
      } else {
        throw new Error('Token not found in response headers');
      }

      // Reset form and states
      setFormData({ username: '', password: '' });
      setLoading(false);
      setError('');

      // Redirect to profile page after successful login
      navigate('/profile'); 
    } catch (err: any) {
      // Handle errors from the API
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <LoginComponent
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default LoginContainer;