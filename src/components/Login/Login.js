import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { Navigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const authedUser = useSelector(state => state.authedUser);

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthedUser(user));
  };

  if (authedUser) {
    return <Navigate to="/" />;
  }

  if (!users || Object.keys(users).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <select value={user} onChange={handleChange}>
          <option value="">Select a user</option>
          {Object.keys(users).map(userId => (
            <option key={userId} value={userId}>
              {users[userId].name}
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;