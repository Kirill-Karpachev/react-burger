import {
  postEmail,
  postPassword
} from "../../utils/burger-api";

export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_FAILED = 'EMAIL_FAILED';
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';

export function forgetPassword(form, replace) {
  return function (dispatch) {
    dispatch({
      type: EMAIL_REQUEST,
    })
    postEmail(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: EMAIL_SUCCESS,
            payload: res.success
          })
          replace()
        }
      })
      .catch(e => {
        dispatch({
          type: EMAIL_FAILED,
        })
      })
  }
}

export function recoverPassword(form, replace) {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_REQUEST,
    })
    postPassword(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_SUCCESS,
            payload: res.success
          })
          replace()
        }
      })
      .catch(e => {
        dispatch({
          type: PASSWORD_FAILED,
        })
      })
  }
}
