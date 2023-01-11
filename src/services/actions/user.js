import {
  getUserData,
  logoutUser,
  patchUserData,
  postToken
} from "../../utils/burger-api";
import {
  deleteCookie,
  setCookie
} from "../../utils/util";

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
export const REMOVE_FORM = 'REMOVE_FORM';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const USER_AUTH = 'USER_AUTH';
export const USER_IS_NOT_AUTH = 'USER_NOT_AUTH';

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
          dispatch({
            type: USER_AUTH,
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

export function updateUser(form) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })
    patchUserData(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res
          })
        }
      })
      .catch(e => {
        dispatch({
          type: UPDATE_USER_FAILED,
        })
      })
  }
}

export function updateToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    })
    postToken()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
          })
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          setCookie('time', Date.now() + (19 * 60 * 1000))
        }
      })
      .catch(e => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        })
      })
  }
}

export function signOut(refreshToken, replace) {
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
          dispatch({
            type: USER_IS_NOT_AUTH
          })
          deleteCookie('refreshToken');
          deleteCookie('accessToken');
          deleteCookie('time');
          replace();
        }
      })
      .catch(e => {
        dispatch({
          type: USER_LOGOUT_FAILED,
        })
      })
  }
}
