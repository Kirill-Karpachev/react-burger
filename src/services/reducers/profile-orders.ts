import {
  TWsUserActions,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_ORDERS,
} from "../actions/ws-user-actions";

type TProfileOrdersState = {
  userWsConnected: boolean;
  userOrders: Array<{
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  }>;
  userError: undefined | string;
  userTotal: number;
  userTotalToday: number;
};

const initialState: TProfileOrdersState = {
  userWsConnected: false,
  userOrders: [],
  userError: undefined,
  userTotal: 0,
  userTotalToday: 0,
};

export const profileOrdersReducer = (
  state = initialState,
  action: TWsUserActions
): TProfileOrdersState => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        userError: undefined,
        userWsConnected: true,
      };
    }
    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        userError: action.payload,
        userWsConnected: false,
      };
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        userError: undefined,
        userWsConnected: false,
      };
    }
    case WS_USER_GET_ORDERS: {
      return {
        ...state,
        userError: undefined,
        userOrders: action.payload.orders,
        userTotal: action.payload.total,
        userTotalToday: action.payload.totalToday,
      };
    }
    default:
      return state;
  }
};
