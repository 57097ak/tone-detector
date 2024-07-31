// src/components/ProtectedRoutes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log('User Info in ProtectedRoute:', userInfo);

  return userInfo ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
