import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from './Home';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      authedUser: 'sarahedo',
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'Sarah_Edo.webp',
          answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
          },
          questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
        },
      },
      questions: {
        "8xf0y6ziyjabvozdd253nd": {
          id: '8xf0y6ziyjabvozdd253nd',
          author: 'sarahedo',
          timestamp: 1467166872634,
          optionOne: {
            votes: ['sarahedo'],
            text: 'Build our new application with Javascript',
          },
          optionTwo: {
            votes: [],
            text: 'Build our new application with Typescript'
          }
        },
        "6ni6ok3ym7mf1p33lnez": {
          id: '6ni6ok3ym7mf1p33lnez',
          author: 'mtsamis',
          timestamp: 1468479767190,
          optionOne: {
            votes: [],
            text: 'hire more frontend developers',
          },
          optionTwo: {
            votes: ['mtsamis', 'sarahedo'],
            text: 'hire more backend developers'
          }
        }
      },
    });
  });

  it('should render unanswered questions by default', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    const unansweredQuestions = await screen.findAllByText('Unanswered Questions');
    expect(unansweredQuestions).not.toHaveLength(0);
  });

  it('should switch to answered questions when clicked', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.click(await screen.findByText('Answered Questions'));
    const answeredQuestions = await screen.findAllByText('Answered Questions');
    expect(answeredQuestions).not.toHaveLength(0);
  });
});