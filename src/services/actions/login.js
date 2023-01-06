import {
  postLogin
} from "../../utils/burger-api";
import {
  setCookie
} from "../../utils/util";
import {
  getUser
} from "./user";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_FORM = 'LOGIN_FORM';

export function getLogin(form, replace) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    postLogin(form.email, form.password)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res
          })
          let accessToken;
          let refreshToken;
          accessToken = res.accessToken.split('Bearer ')[1]
          refreshToken = res.refreshToken;

          if (accessToken) {
            setCookie('accessToken', accessToken);
          }
          if (refreshToken) {
            setCookie('refreshToken', refreshToken)
          }
          replace();
        }
      }).catch(e => {
        dispatch({
          type: LOGIN_FAILED,
        })
      })
  }
}
