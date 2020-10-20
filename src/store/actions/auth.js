import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type : actionTypes.AUTH_START

  };
}

export const authSuccess = (token, email) => {
  return {
    type : actionTypes.AUTH_SUCCESS,
    token : token,
    email : email
  };
}
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  console.log("Removed token and email!");
  return {
    type : actionTypes.AUTH_LOGOUT
  };
}

export const authFail = (error) => {
  return {
    type : actionTypes.AUTH_FAIL,
    error : error
  };
}
export const checkAuthStatus = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {     
        const email = localStorage.getItem('email');
        dispatch(authSuccess(token, email));                    
    }
  }
}
export const auth = (email, password, signUp) => {
  return dispatch => {
    console.log("in action auth");
    dispatch(authStart());
    const authData = {
      email : email,
      password : password
    };

    //server call

    let response = { data : {
      idToken : 'abc',
      localId: 'test@mail.com'
    }};

    
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('email', response.data.localId);
    dispatch(authSuccess(response.data.idToken, response.data.localId));
  };
}
