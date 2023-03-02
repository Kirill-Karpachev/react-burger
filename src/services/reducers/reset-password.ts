import {
  EMAIL_FAILED,
  EMAIL_REQUEST,
  EMAIL_SUCCESS,
  PASSWORD_FAILED,
  PASSWORD_REQUEST,
  PASSWORD_SUCCESS,
  TResetPasswordActions,
} from "../actions/reset-password";

type TResetPasswordState = {
  successEmail: boolean;
  emailRequest: boolean;
  emailFailed: boolean;
  passwordRequest: boolean;
  passwordFailed: boolean;
};

const initialState: TResetPasswordState = {
  successEmail: false,
  emailRequest: false,
  emailFailed: false,
  passwordRequest: false,
  passwordFailed: false,
};

export const resetPasswordReducer = (
  state = initialState,
  action: TResetPasswordActions
): TResetPasswordState => {
  switch (action.type) {
    case EMAIL_REQUEST: {
      return {
        ...state,
        emailRequest: true,
      };
    }
    case EMAIL_SUCCESS: {
      return {
        ...state,
        successEmail: action.payload,
        emailRequest: false,
        emailFailed: false,
      };
    }
    case EMAIL_FAILED: {
      return {
        ...state,
        emailFailed: true,
        emailRequest: false,
      };
    }
    case PASSWORD_REQUEST: {
      return {
        ...state,
        passwordRequest: true,
      };
    }
    case PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordRequest: false,
        passwordFailed: false,
      };
    }
    case PASSWORD_FAILED: {
      return {
        ...state,
        passwordFailed: true,
        passwordRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
