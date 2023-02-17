import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TRegisterActions,
} from "../actions/register";

type TRegister = {
  registerRequest: boolean;
  registerFailed: boolean;
  form: null | { name: string; email: string; password: string };
};

const initialState: TRegister = {
  form: null,
  registerRequest: false,
  registerFailed: false,
};

export const registerReducer = (
  state = initialState,
  action: TRegisterActions
): TRegister => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        form: action.payload,
        registerRequest: false,
        registerFailed: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
