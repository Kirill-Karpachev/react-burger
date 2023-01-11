import {
  EMAIL_FAILED,
  EMAIL_REQUEST,
  EMAIL_SUCCESS,
  PASSWORD_FAILED,
  PASSWORD_REQUEST,
  PASSWORD_SUCCESS
} from "../actions/reset-password"


const initialState = {
  successEmail: false,
  emailRequest: false,
  emailFailed: false,
  passwordRequest: false,
  passwordFailed: false,
}

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_REQUEST: {
      return {
        ...state,
        emailRequest: true,
      }
    }
    case EMAIL_SUCCESS: {
      return {
        ...state,
        successEmail: action.payload,
        emailRequest: false,
        emailFailed: false,
      }
    }
    case EMAIL_FAILED: {
      return {
        ...state,
        emailFailed: true,
        emailRequest: false,
      }
    }
    case PASSWORD_REQUEST: {
      return {
        ...state,
        passwordRequest: true,
      }
    }
    case PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordRequest: false,
        passwordFailed: false,
      }
    }
    case PASSWORD_FAILED: {
      return {
        ...state,
        passwordFailed: true,
        passwordRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}
