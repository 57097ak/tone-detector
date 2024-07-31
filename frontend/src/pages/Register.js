// src/pages/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * Register component for user registration.
 *
 * @component
 * @example
 * return (
 *   <Register />
 * )
 */
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission for user registration.
   *
   * @param {Object} e - The event object.
   * @async
   * @function
   * @throws Will catch an error if registration fails.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { email, password, name });
      setEmail(''); // Clear email input
      setPassword(''); // Clear password input
      setName(''); // Clear name input
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
