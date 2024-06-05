import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(reducer, middleware);

test('renders login page by default', async () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  const loginHeading = await screen.findByRole('heading', { name: /login/i });
  expect(loginHeading).toBeInTheDocument();
});