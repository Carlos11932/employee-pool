import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const authedUser = useSelector(state => state.authedUser);

  return authedUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;