import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe ('AuthReducer ', () => {
  it('should have initial state set by reducer', () => {
    expect(reducer(undefined, {})).toEqual({
      token : null,
      id : null,
      error: null
    });
  });
  it('should have token and id updated in state after auth success', () => {
    expect(reducer({
      token : null,
      id : null,
      error: null
      }, {
        type : actionTypes.AUTH_SUCCESS,
        token : 'some-token',
        id : 'some-id'
      })).toEqual({
        token : 'some-token',
        id : 'some-id',
        error: null
    });
  });
});
