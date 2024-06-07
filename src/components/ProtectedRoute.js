import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authedUser = useSelector(state => state.authedUser);
  const location = useLocation();

  if (!authedUser) {
    localStorage.setItem('lastRequestedPage', location.pathname);
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;