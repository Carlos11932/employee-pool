import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector(state => state.authedUser);
  const users = useSelector(state => state.users);
  const questions = useSelector(state => state.questions);

  if (!authedUser || !users[authedUser] || !questions) {
    return <div>Loading...</div>;
  }

  const answeredQuestions = Object.keys(users[authedUser].answers)
    .sort((a, b) => questions[b]?.timestamp - questions[a]?.timestamp);
  const unansweredQuestions = Object.keys(questions)
    .filter(qid => !answeredQuestions.includes(qid))
    .sort((a, b) => questions[b]?.timestamp - questions[a]?.timestamp);

  return (
    <div className="home-container">
      <div className="toggle-buttons">
        <button onClick={() => setShowAnswered(false)} disabled={!showAnswered}>Unanswered Questions</button>
        <button onClick={() => setShowAnswered(true)} disabled={showAnswered}>Answered Questions</button>
      </div>
      <div className="questions-list">
        {showAnswered ? (
          <>
            <h3>Answered Questions</h3>
            <ul>
              {answeredQuestions.map(qid => (
                questions[qid] && (
                  <li key={qid} className="question-item">
                    <Link to={`/questions/${qid}`}>{questions[qid].optionOne.text} ---------- {questions[qid].optionTwo.text}</Link>
                  </li>
                )
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3>Unanswered Questions</h3>
            <ul>
              {unansweredQuestions.map(qid => (
                questions[qid] && (
                  <li key={qid} className="question-item">
                    <Link to={`/questions/${qid}`}>{questions[qid].optionOne.text} ---------- {questions[qid].optionTwo.text}</Link>
                  </li>
                )
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;