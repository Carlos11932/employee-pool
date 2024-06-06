import React from 'react';
import { useSelector } from 'react-redux';
import './Leaderboard.css';

const Leaderboard = () => {
  const users = useSelector(state => state.users);

  if (!users) {
    return <div>Loading...</div>;
  }

  const sortedUsers = Object.values(users).sort((a, b) => (
    (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
  ));

  return (
    <div className="leaderboard-container">
      <h3>Leaderboard</h3>
      <ul>
        {sortedUsers.map(user => (
          <li key={user.id}>
            <img
              src={user.avatarURL || 'https://via.placeholder.com/150'}
              alt={`Avatar of ${user.name}`}
            />
            <p><strong>{user.name}   </strong></p>
            <p>Questions created: {user.questions.length}</p>
            <p>Questions answered: {Object.keys(user.answers).length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;