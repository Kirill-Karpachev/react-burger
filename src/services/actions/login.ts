import { AppDispatch } from "../../types";
import { postLogin } from "../../utils/burger-api";
import { setCookie } from "../../utils/util";
import { USER_AUTH, USER_SUCCESS } from "./user";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGIN_FORM: "LOGIN_FORM" = "LOGIN_FORM";

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  };
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginFormAction {
  readonly type: typeof LOGIN_FORM;
  readonly payload: {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  };
}

export type TLoginActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILoginFormAction;

export function getLogin(
  form: { email: string; password: string },
  replace: any
) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    postLogin(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res,
          });
          dispatch({
            type: USER_AUTH,
          });
          dispatch({
            type: USER_SUCCESS,
            payload: res,
          });

          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          setCookie("time", Date.now() + 19 * 60 * 1000);

          replace();
        }
      })
      .catch((e) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}
