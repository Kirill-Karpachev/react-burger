import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../types";
import { getCookie } from "../../utils/util";

type TWSActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onOrders: string;
  wsSendOrders: string;
};

export const socketMiddleware: any = (
  wsUrl: string,
  wsActions: TWSActions,
  auth: boolean
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onOrders, wsSendOrders } =
        wsActions;
      const accessToken = getCookie("accessToken");
      if (type === wsInit && auth === false) {
        socket = new WebSocket(wsUrl);
      } else if (type === wsInit && auth && accessToken) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({
            type: onOpen,
            payload: event,
          });
        };

        socket.onerror = (event: Event) => {
          dispatch({
            type: onError,
            payload: event,
          });
        };

        socket.onmessage = (event: MessageEvent<any>) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onOrders,
            payload: restParsedData,
          });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (type === wsSendOrders) {
          const order = payload;
          socket.send(
            JSON.stringify({
              ...order,
              token: accessToken,
            })
          );
        }
      }

      next(action);
    };
  };
};
