// src/pages/Login.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

/**
 * Login component for user authentication.
 *
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles the form submission for logging in a user.
   *
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      navigate('/sentiment-analysis');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
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
        <button type="submit" className="bg-primary text-white py-2 px-4 rounded">Login</button>
        <p className="mt-4">
          New here? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
