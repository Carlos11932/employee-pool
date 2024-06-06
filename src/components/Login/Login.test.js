import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'Sarah_Edo.webp',
        },
        tylermcginnis: {
          id: 'tylermcginnis',
          name: 'Tyler McGinnis',
          avatarURL: 'Tyler_McGinnis.webp',
        },
      },
    });
  });

  it('should render login component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});