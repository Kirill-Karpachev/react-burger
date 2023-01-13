import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../actions/login"
import {
  REMOVE_FORM
} from "../actions/user"

const initialState = {
  loginRequest: false,
  loginFailed: false,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false,
      }
    }
    case REMOVE_FORM: {
      return {
        ...state,
        form: {
          email: '',
          password: '',
        }
      }
    }
    default: {
      return state;
    }
  }
}
