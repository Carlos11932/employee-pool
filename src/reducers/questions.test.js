import questions from './questions';
import { ADD_QUESTION } from '../actions/questions';

describe('questions reducer', () => {
  it('should handle ADD_QUESTION', () => {
    const question = {
      id: '8xf0y6ziyjabvozdd253nd',
      optionOne: { votes: [], text: 'Option One' },
      optionTwo: { votes: [], text: 'Option Two' },
      author: 'sarahedo',
    };

    const action = {
      type: ADD_QUESTION,
      question,
    };

    const state = {};
    const expectedState = {
      [question.id]: question,
    };

    expect(questions(state, action)).toEqual(expectedState);
  });
});