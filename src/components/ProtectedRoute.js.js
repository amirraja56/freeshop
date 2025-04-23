// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  // While redirecting, don’t render anything (optional)
  if (!token) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
