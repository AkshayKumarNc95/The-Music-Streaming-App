import { history } from "../../helpers/history";
import _ from "lodash";



export function registerUser(user) {
  // First dispatch a waiting action

  return async function registerUser(dispatch, getState) {
    dispatch({
      type: "REGISTER_PENDING",
      payload: {pending: true, status: {isError: false}}
    });
    var millisecondsToWait = 2000;
    setTimeout(function() {
      if (true) {
        
        
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: {pending: false, status: {isError: false, error: ''}}
        });

        history.push('/');
      } else {
        dispatch({
          type: "REGISTER_FAILED",
          payload: {pending: false, status: {isError: true, error: ''}}
        });
      }
    }, millisecondsToWait);
  };
  //On success done then push the login screen
}


export function login(user){

  return async function(dispatch,getState){

    dispatch({
      type: "LOGIN_PENDING",
      payload: {pending: true, status: {isError: false}}
    });

    var millisecondsToWait = 2000;
    setTimeout(function() {
      if (true) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {pending: false, status: {isError: false, error: ''}}
        });

        history.push('/');
      } else {
        dispatch({
          type: "REGISTER_FAILED",
          payload: {pending: false, status: {isError: true, error: 'Error'}}
        });
      }
    }, millisecondsToWait);

  }
}