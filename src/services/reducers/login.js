import {
  LOGIN_FAILED,
  LOGIN_FORM,
  LOGIN_REQUEST,
  LOGIN_SUCCESS
} from "../actions/login"
import {
  REMOVE_FORM
} from "../actions/user"

const initialState = {
  form: {
    email: '',
    password: '',
  },
  loginRequest: false,
  loginFailed: false,
  isAuth: false
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value
        }
      }
    }
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
        isAuth: true
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
        },
        isAuth: false
      }
    }
    default: {
      return state;
    }
  }
}
