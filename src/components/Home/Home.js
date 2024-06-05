// src/components/Home/Home.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
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
      <h3>Answered Questions</h3>
      <ul>
        {answeredQuestions.map(qid => (
          questions[qid] && (
            <li key={qid}>
              <Link to={`/questions/${qid}`}>{questions[qid].optionOne.text} ---------- {questions[qid].optionTwo.text}</Link>
            </li>
          )
        ))}
      </ul>
      <h3>Unanswered Questions</h3>
      <ul>
        {unansweredQuestions.map(qid => (
          questions[qid] && (
            <li key={qid}>
              <Link to={`/questions/${qid}`}>{questions[qid].optionOne.text} ---------- {questions[qid].optionTwo.text}</Link>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Home;