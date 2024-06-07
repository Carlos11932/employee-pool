import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import './Login.css';

const Login = () => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state => state.users);

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      dispatch(setAuthedUser(user));
      const lastRequestedPage = localStorage.getItem('lastRequestedPage');
      if (lastRequestedPage) {
        navigate(lastRequestedPage);
        localStorage.removeItem('lastRequestedPage');
      } else {
        navigate('/');
      }
    }
  };

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