import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  TLoginActions,
} from "../actions/login";
import { REMOVE_FORM, TUserActions } from "../actions/user";

type TLogin = {
  loginRequest: boolean;
  loginFailed: boolean;
  form?: { email: string; password: string };
};

const initialState: TLogin = {
  loginRequest: false,
  loginFailed: false,
};

export const loginReducer = (
  state = initialState,
  action: TLoginActions | TUserActions
): TLogin => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      };
    }
    case REMOVE_FORM: {
      return {
        ...state,
        form: {
          email: "",
          password: "",
        },
      };
    }
    default: {
      return state;
    }
  }
};
