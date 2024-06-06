import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../../actions/questions';
import './NewPoll.css';

const NewPoll = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const authedUser = useSelector(state => state.authedUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOneText.trim() || !optionTwoText.trim()) {
      setError('Both options are required.');
      return;
    }

    dispatch(handleAddQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }));

    navigate('/');
  };

  return (
    <div className="newpollcontainer">
      <h3>Create New Poll</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Option One"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option Two"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default NewPoll;