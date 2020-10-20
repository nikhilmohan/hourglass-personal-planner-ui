import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token : null,
  email : null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,        
        error : null

      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token : action.token,
        email : action.email,
        error: null

      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error

      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        email: null

      };
    }
    return state;
}
export default authReducer;
