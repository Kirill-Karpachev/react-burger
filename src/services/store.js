import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_ORDERS
} from "./actions/ws-actions";
import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_GET_ORDERS,
  WS_USER_SEND_ORDERS
} from "./actions/ws-user-actions";
import {
  applyMiddleware,
  createStore
} from "redux";

import {
  socketMiddleware
} from "./middleware/socket-middleware";
import thunk from "redux-thunk";
import {
  composeWithDevTools
} from "redux-devtools-extension";
import {
  WSS_URL
} from "../utils/const";
import {
  rootReducer
} from "./reducers";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
  wsSendOrders: WS_SEND_ORDERS,
};

const userWsActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onOrders: WS_USER_GET_ORDERS,
  wsSendOrders: WS_USER_SEND_ORDERS,
};

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(`${WSS_URL}/orders/all`, wsActions, false),
  socketMiddleware(`${WSS_URL}/orders`, userWsActions, true)));

export const store = createStore(rootReducer, enhancer);
