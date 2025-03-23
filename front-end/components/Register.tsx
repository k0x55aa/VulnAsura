'use client'; // Marking this as a client-side component

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  password: string;
}

const Register: React.FC = () => {
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
      // Send POST request to the backend for registration
      const response = await fetch('http://127.0.0.1:8080/auth/register', {  // Adjust the URL to your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Reset form and states
      setFormData({ username: '', password: '' });
      setLoading(false);
      setError('');

      // Redirect to login page after successful registration
      navigate('/'); 
    } catch (err: any) {
      // Handle errors from the API
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
