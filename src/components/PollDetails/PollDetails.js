import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { handleSaveQuestionAnswer } from '../../actions/questions';
import './PollDetails.css';

const PollDetails = () => {
  const { question_id } = useParams();
  const question = useSelector(state => state.questions[question_id]);
  const authedUser = useSelector(state => state.authedUser);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  if (!question) {
    return <Navigate to="/404" />;
  }

  const author = users[question.author];
  const hasVoted = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser);
  
  const handleVote = (answer) => {
    dispatch(handleSaveQuestionAnswer({
      authedUser,
      qid: question_id,
      answer,
    }));
  };

  return (
    <div className="poll-details container">
      <h3>Would you rather?</h3>
      <div className="poll-author">
        <img src={author.avatarURL || 'https://via.placeholder.com/150'} alt={`Avatar of ${author.name}`} />
        <p>Asked by {author.name}</p>
      </div>
      {hasVoted ? (
        <div className="poll-results">
          <div className={`option ${question.optionOne.votes.includes(authedUser) ? 'selected' : ''}`}>
            <p>{question.optionOne.text}</p>
            <p>{question.optionOne.votes.length} vote(s) ({((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2)}%)</p>
          </div>
          <div className={`option ${question.optionTwo.votes.includes(authedUser) ? 'selected' : ''}`}>
            <p>{question.optionTwo.text}</p>
            <p>{question.optionTwo.votes.length} vote(s) ({((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100).toFixed(2)}%)</p>
          </div>
        </div>
      ) : (
        <div className="poll-options">
          <button onClick={() => handleVote('optionOne')}>{question.optionOne.text}</button>
          <button onClick={() => handleVote('optionTwo')}>{question.optionTwo.text}</button>
        </div>
      )}
    </div>
  );
};

export default PollDetails;