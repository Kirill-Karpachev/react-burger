import {
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_AUTH,
  USER_FAILED,
  USER_IS_NOT_AUTH,
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
  updateTokenRequest: false,
  updateTokenFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  isAuth: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_AUTH: {
      return {
        ...state,
        isAuth: true,
      }
    }
    case USER_IS_NOT_AUTH: {
      return {
        ...state,
        isAuth: false
      }
    }
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
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenFailed: false,
      }
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        updateTokenFailed: true,
        updateTokenRequest: false,
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state,
          name: action.payload.user.name,
          email: action.payload.user.email,
        },
        updateUserRequest: false,
        updateUserFailed: false,
      }
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        updateUserRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}
