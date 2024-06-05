import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveUsers } from './users'; 

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export const receiveQuestions = (questions) => {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
};

export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleAddQuestion = (question) => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return _saveQuestion(question)
      .then((formattedQuestion) => {
        const { authedUser } = getState();
        const { users } = getState();

        const updatedUsers = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            questions: users[authedUser].questions.concat([formattedQuestion.id])
          }
        };

        dispatch(addQuestion(formattedQuestion));
        dispatch(receiveUsers(updatedUsers));
      })
      .then(() => dispatch(hideLoading()));
  };
};

export const handleSaveQuestionAnswer = (info) => {
  return (dispatch, getState) => {
    dispatch(showLoading());
    return _saveQuestionAnswer(info)
      .then(() => {
        const { authedUser, qid, answer } = info;
        const { users, questions } = getState();
        
        const updatedUsers = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [qid]: answer
            }
          }
        };

        const updatedQuestions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [answer]: {
              ...questions[qid][answer],
              votes: questions[qid][answer].votes.concat(authedUser)
            }
          }
        };

        dispatch(receiveUsers(updatedUsers));
        dispatch(receiveQuestions(updatedQuestions));
      })
      .then(() => dispatch(hideLoading()));
  };
};