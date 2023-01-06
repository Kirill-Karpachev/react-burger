import {
  getUserData,
  logoutUser
} from "../../utils/burger-api";
import { deleteCookie } from "../../utils/util";

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const REMOVE_FORM = 'REMOVE_FORM';

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    })
    getUserData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: res
          })
        }
      })
      .catch(e => {
        dispatch({
          type: USER_FAILED,
        })
      })
  }
}

export function signOut(refreshToken, history) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    })
    logoutUser(refreshToken)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS,
          })
          dispatch({
            type: REMOVE_FORM,
          })
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          history.replace({ pathname: '/login' });
        }
      })
      .catch(e => {
        dispatch({
          type: USER_LOGOUT_FAILED,
        })
      })
  }
}
