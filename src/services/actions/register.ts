import { AppDispatch } from "../../types";
import { postRegisterUser } from "../../utils/burger-api";
import { setCookie } from "../../utils/util";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: {
    accessToken: string;
    refreshToken: string;
    success: boolean;
    user: { email: string; name: string; password: string };
  };
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction;

export function registerUser(
  form: { name: string; email: string; password: string },
  replace: any
) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    postRegisterUser(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
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
          type: REGISTER_FAILED,
        });
      });
  };
}
