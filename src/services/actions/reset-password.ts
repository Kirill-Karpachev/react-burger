import { AppDispatch } from "../../types";
import { postEmail, postPassword } from "../../utils/burger-api";

export const EMAIL_REQUEST: "EMAIL_REQUEST" = "EMAIL_REQUEST";
export const EMAIL_SUCCESS: "EMAIL_SUCCESS" = "EMAIL_SUCCESS";
export const EMAIL_FAILED: "EMAIL_FAILED" = "EMAIL_FAILED";
export const PASSWORD_REQUEST: "PASSWORD_REQUEST" = "PASSWORD_REQUEST";
export const PASSWORD_SUCCESS: "PASSWORD_SUCCESS" = "PASSWORD_SUCCESS";
export const PASSWORD_FAILED: "PASSWORD_FAILED" = "PASSWORD_FAILED";

export interface IEmailRequestAction {
  readonly type: typeof EMAIL_REQUEST;
}

export interface IEmailSuccessAction {
  readonly type: typeof EMAIL_SUCCESS;
  readonly payload: boolean;
}

export interface IEmailFailedAction {
  readonly type: typeof EMAIL_FAILED;
}

export interface IPasswordRequestAction {
  readonly type: typeof PASSWORD_REQUEST;
}

export interface IPasswordSuccessAction {
  readonly type: typeof PASSWORD_SUCCESS;
}

export interface IPasswordFailedAction {
  readonly type: typeof PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IEmailRequestAction
  | IEmailSuccessAction
  | IEmailFailedAction
  | IPasswordRequestAction
  | IPasswordSuccessAction
  | IPasswordFailedAction;

export function forgetPassword(form: { email: string }, replace: () => void) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: EMAIL_REQUEST,
    });
    postEmail(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: EMAIL_SUCCESS,
            payload: res.success,
          });
          replace();
        }
      })
      .catch((e) => {
        dispatch({
          type: EMAIL_FAILED,
        });
      });
  };
}

export function recoverPassword(
  form: { password: string; token: string },
  replace: () => void
) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: PASSWORD_REQUEST,
    });
    postPassword(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PASSWORD_SUCCESS,
            payload: res.success,
          });
          replace();
        }
      })
      .catch((e) => {
        dispatch({
          type: PASSWORD_FAILED,
        });
      });
  };
}
