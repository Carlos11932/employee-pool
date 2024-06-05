import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../reducers';
import middleware from '../../middleware';
import { BrowserRouter as Router } from 'react-router-dom';

const initialState = {
  authedUser: 'sarahedo',
  users: {
    sarahedo: {
      id: 'sarahedo',
      password: 'password123',
      name: 'Sarah Edo',
      avatarURL: null,
      answers: {},
      questions: [],
    },
  },
  questions: {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'Build our new application with Javascript',
      },
      optionTwo: {
        votes: [],
        text: 'Build our new application with Typescript',
      },
    },
  },
  loadingBar: { default: 0 },
};

const store = createStore(reducer, initialState, middleware);

describe('Home', () => {
  it('should render unanswered questions by default', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    const unansweredQuestions = await screen.findByText('Unanswered Questions');
    expect(unansweredQuestions).toBeInTheDocument();
  });

  it('should switch to answered questions when clicked', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    fireEvent.click(await screen.findByText('Answered Questions'));
    const answeredQuestions = await screen.findByText('Answered Questions');
    expect(answeredQuestions).toBeInTheDocument();
  });
});