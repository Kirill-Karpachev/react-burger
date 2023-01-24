import {
  postRegisterUser
} from "../../utils/burger-api";
import {
  setCookie
} from "../../utils/util";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function registerUser(form, replace) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    })
    postRegisterUser(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res
          })
          console.log(res)
          setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', res.refreshToken);
          setCookie('time', Date.now() + (19 * 60 * 1000))

          replace()
        }
      })
      .catch(e => {
        dispatch({
          type: REGISTER_FAILED,
        })
      })
  }
}
