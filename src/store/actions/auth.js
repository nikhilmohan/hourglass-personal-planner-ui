import * as actionTypes from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
  return {
    type : actionTypes.AUTH_START

  };
}

export const authSuccess = (data) => {
  return {
    type : actionTypes.AUTH_SUCCESS,
    token : data.idToken,
    id : data.localId
  };
}
export const logout = (userId, token) => {
  console.log("userId " + userId);
  return dispatch => {
    const data = {
      localId: userId
    };
    const authHeader = {
      headers: {
        Authorization : 'Bearer ' + token
      }
    }
    Axios.post('http://gateway-service:9900/user-service/logout', data, authHeader)
    .then(response => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      console.log("Removed token and id!");
      dispatch(authLogout())
      
    })
    .catch(err => console.log(err));
  };
}

export const authLogout = () => {
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
        const id = localStorage.getItem('id');
        dispatch(authSuccess(token, id));                    
    }
  }
}
export const checkAuthTimeout = (expiresIn, id) => {
  return dispatch => {
    setTimeout( (expiresIn) => {
      dispatch(logout(id));

    }, expiresIn * 1000);
  };
}

export const auth = (email, password, signUp) => {
  return dispatch => {
    console.log("in action auth");
    dispatch(authStart());
    const authData = {
      email : email,
      password : password
    };

    const path = ( signUp === true ) ? "signup" : "login";
    Axios.post('http://gateway-service:9900/user-service/' + path, authData)
    .then(response => {
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('id', response.data.localId);
      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn, response.data.localId))
    })
    .catch(err => {
      console.log("login error : " + err);
      dispatch(authFail(err))
    });

    
    
  };
}
