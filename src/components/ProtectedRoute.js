import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authedUser = useSelector(state => state.authedUser);

  if (!authedUser) {
    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;