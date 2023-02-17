import { getCookie } from "../../utils/util";

type TWSActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onOrders: string;
  wsSendOrders: string;
};

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWSActions,
  auth: boolean
) => {
  return (store: any) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
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
        socket.onopen = (event: any) => {
          dispatch({
            type: onOpen,
            payload: event,
          });
        };

        socket.onerror = (event: any) => {
          dispatch({
            type: onError,
            payload: event,
          });
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onOrders,
            payload: restParsedData,
          });
        };

        socket.onclose = (event: any) => {
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
