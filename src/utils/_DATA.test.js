import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

describe('_saveQuestion', () => {
  it('should save a question correctly', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo'
    };

    const result = await _saveQuestion(question);
    expect(result).toMatchObject({
      optionOne: {
        text: 'Option One'
      },
      optionTwo: {
        text: 'Option Two'
      },
      author: 'sarahedo'
    });
  });

  it('should return an error if incorrect data is passed', async () => {
    const question = {
      optionOneText: '',
      optionTwoText: '',
      author: ''
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe('_saveQuestionAnswer', () => {
  it('should save a question answer correctly', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    await expect(_saveQuestionAnswer(answer)).resolves.toBe(true);
  });

  it('should return an error if incorrect data is passed', async () => {
    const answer = {
      authedUser: '',
      qid: '',
      answer: ''
    };

    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});