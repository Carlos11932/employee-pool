import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import './Nav.css';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector(state => state.authedUser);
  const users = useSelector(state => state.users);

  const handleLogout = () => {
    const currentPath = window.location.pathname;
    const validRoutes = ['/add', '/leaderboard', '/questions'];
    const isValidRoute = validRoutes.some(route => currentPath.startsWith(route));

    if (isValidRoute && authedUser) {
      localStorage.setItem(`lastRequestedPage_${authedUser}`, currentPath);
    } else {
      localStorage.removeItem(`lastRequestedPage_${authedUser}`);
    }

    dispatch(setAuthedUser(null));
    localStorage.removeItem('authedUser');
    navigate('/login');
  };

  return (
    <nav className="nav-container">
      <ul>
        {authedUser && (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">New Poll</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </>
        )}
      </ul>
      {authedUser && users[authedUser] && (
        <div className="user-info">
          <img src={users[authedUser].avatarURL || 'https://via.placeholder.com/150'} alt={`Avatar of ${users[authedUser].name}`} />
          <div className="logout-container">
            <span>Hello, {users[authedUser].name}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;