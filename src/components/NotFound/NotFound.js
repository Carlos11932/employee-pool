
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import './NotFound.css';

const NotFound = () => {
  const authedUser = useSelector(state => state.authedUser);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authedUser) {
      localStorage.setItem('lastRequestedPage', location.pathname);
      dispatch(setAuthedUser(null));
      localStorage.removeItem('authedUser');
    }
  }, [authedUser, location, dispatch]);

  if (!authedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;