import { TFeed } from "../../types/types";

export const WS_USER_CONNECTION_START: "WS_USER_CONNECTION_START" =
  "WS_USER_CONNECTION_START";
export const WS_USER_CONNECTION_SUCCESS: "WS_USER_CONNECTION_SUCCESS" =
  "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_ERROR: "WS_USER_CONNECTION_ERROR" =
  "WS_USER_CONNECTION_ERROR";
export const WS_USER_CONNECTION_CLOSED: "WS_USER_CONNECTION_CLOSED" =
  "WS_USER_CONNECTION_CLOSED";
export const WS_USER_GET_ORDERS: "WS_USER_GET_ORDERS" = "WS_USER_GET_ORDERS";
export const WS_USER_SEND_ORDERS: "WS_USER_SEND_ORDERS" = "WS_USER_SEND_ORDERS";

export interface IWsUserConnectionStartAction {
  readonly type: typeof WS_USER_CONNECTION_START;
}

export interface IWsUserConnectionSuccessAction {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export interface IWsUserConnectionErrorAction {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IWsUserConnectionClosedAction {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export interface IWsUserGetOrdersAction {
  readonly type: typeof WS_USER_GET_ORDERS;
  readonly payload: { orders: Array<TFeed>; total: number; totalToday: number };
}

export interface IWsUserSendOrdersAction {
  readonly type: typeof WS_USER_SEND_ORDERS;
}

export type TWsUserActions =
  | IWsUserConnectionStartAction
  | IWsUserConnectionSuccessAction
  | IWsUserConnectionErrorAction
  | IWsUserConnectionClosedAction
  | IWsUserGetOrdersAction
  | IWsUserSendOrdersAction;
