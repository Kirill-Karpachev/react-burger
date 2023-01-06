import {
  USER_FAILED,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REQUEST,
  USER_SUCCESS
} from "../actions/user"

const initialState = {
  user: {
    name: '',
    email: '',
  },
  userRequest: false,
  userFailed: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      }
    }
    case USER_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
        userRequest: false,
        userFailed: false,
      }
    }
    case USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
      }
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        userLogoutRequest: true,
      }
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        user: {
          name: '',
          email: '',
        },
        userLogoutRequest: false,
        userLogoutFailed: false,
      }
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        userLogoutFailed: true,
        userLogoutRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}
