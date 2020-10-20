import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe ('AuthReducer ', () => {
  it('should have initial state set by reducer', () => {
    expect(reducer(undefined, {})).toEqual({
      token : null,
      email : null,
      error: null
    });
  });
  it('should have token and email updated in state after auth success', () => {
    expect(reducer({
      token : null,
      email : null,
      error: null
      }, {
        type : actionTypes.AUTH_SUCCESS,
        token : 'some-token',
        email : 'test@ab.com'
      })).toEqual({
        token : 'some-token',
        email : 'test@ab.com',
        error: null
    });
  });
});
