import { AppDispatch } from "../../types";
import {
  getUserData,
  logoutUser,
  patchUserData,
  postToken,
} from "../../utils/burger-api";
import { deleteCookie, setCookie } from "../../utils/util";

export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_FAILED: "USER_FAILED" = "USER_FAILED";

export const USER_LOGOUT_REQUEST: "USER_LOGOUT_REQUEST" = "USER_LOGOUT_REQUEST";
export const USER_LOGOUT_SUCCESS: "USER_LOGOUT_SUCCESS" = "USER_LOGOUT_SUCCESS";
export const USER_LOGOUT_FAILED: "USER_LOGOUT_FAILED" = "USER_LOGOUT_FAILED";
export const REMOVE_FORM: "REMOVE_FORM" = "REMOVE_FORM";

export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";

export const USER_AUTH: "USER_AUTH" = "USER_AUTH";
export const USER_IS_NOT_AUTH: "USER_NOT_AUTH" = "USER_NOT_AUTH";

export interface IUserRequestAction {
  readonly type: typeof USER_REQUEST;
}

export interface IUserSuccessAction {
  readonly type: typeof USER_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  };
}

export interface IUserFailedAction {
  readonly type: typeof USER_FAILED;
}

export interface IUserLogoutRequestAction {
  readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutSuccessAction {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}

export interface IUserLogoutFailedAction {
  readonly type: typeof USER_LOGOUT_FAILED;
}

export interface IRemoveFormAction {
  readonly type: typeof REMOVE_FORM;
}

export interface IUpdateTokenRequestAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

export interface IUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      email: string;
      name: string;
    };
  };
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUserAuthAction {
  readonly type: typeof USER_AUTH;
}

export interface IUserIsNotAuthAction {
  readonly type: typeof USER_IS_NOT_AUTH;
}

export type TUserActions =
  | IUserRequestAction
  | IUserSuccessAction
  | IUserFailedAction
  | IUserLogoutRequestAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction
  | IRemoveFormAction
  | IUpdateTokenRequestAction
  | IUpdateTokenSuccessAction
  | IUpdateTokenFailedAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction
  | IUserAuthAction
  | IUserIsNotAuthAction;

export function getUser() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    getUserData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: res,
          });
          dispatch({
            type: USER_AUTH,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: USER_FAILED,
        });
      });
  };
}

export function updateUser(form: { email: string; name: string }) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    patchUserData(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
}

export function updateToken(token: { token: string }) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    postToken(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
          });
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
          setCookie("time", Date.now() + 19 * 60 * 1000);
        }
      })
      .catch((e) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
        });
      });
  };
}

export function signOut(
  refreshToken: { token: string | undefined },
  replace: () => void
) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST,
    });
    logoutUser(refreshToken)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT_SUCCESS,
          });
          dispatch({
            type: REMOVE_FORM,
          });
          dispatch({
            type: USER_IS_NOT_AUTH,
          });
          deleteCookie("refreshToken");
          deleteCookie("accessToken");
          deleteCookie("time");
          replace();
        }
      })
      .catch((e) => {
        dispatch({
          type: USER_LOGOUT_FAILED,
        });
      });
  };
}
