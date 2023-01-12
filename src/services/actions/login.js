import {
  postLogin
} from "../../utils/burger-api";
import {
  setCookie
} from "../../utils/util";
import {
  USER_AUTH,
  USER_SUCCESS
} from "./user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_FORM = 'LOGIN_FORM';

export function getLogin(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    postLogin(form)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res
          })
          dispatch({
            type: USER_AUTH
          })
          dispatch({
            type: USER_SUCCESS,
            payload: res
          })

          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          setCookie('time', Date.now() + (19 * 60 * 1000))
        }
      }).catch(e => {
        dispatch({
          type: LOGIN_FAILED,
        })
      })
  }
}
