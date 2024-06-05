import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../reducers';
import middleware from '../../middleware';

const store = createStore(reducer, middleware);

describe('Login', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});