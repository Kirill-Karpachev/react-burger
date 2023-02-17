import { AppDispatch } from "../../types";
import { postOrder } from "../../utils/burger-api";

export const ORDER_DETAILS_REQUEST: "ORDER_DETAILS_REQUEST" =
  "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS: "ORDER_DETAILS_SUCCESS" =
  "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILED: "ORDER_DETAILS_FAILED" =
  "ORDER_DETAILS_FAILED";
export const REMOVE_ORDER_DETAILS: "REMOVE_ORDER_DETAILS" =
  "REMOVE_ORDER_DETAILS";

export interface IOrderDetailsRequestAction {
  readonly type: typeof ORDER_DETAILS_REQUEST;
}

export interface IOrderDetailsSuccessAction {
  readonly type: typeof ORDER_DETAILS_SUCCESS;
  readonly payload: any;
}

export interface IOrderDetailsFailedAction {
  readonly type: typeof ORDER_DETAILS_FAILED;
}

export interface IRemoveOrderDetailsAction {
  readonly type: typeof REMOVE_ORDER_DETAILS;
}

export type TOrderDetailsActions =
  | IOrderDetailsRequestAction
  | IOrderDetailsSuccessAction
  | IOrderDetailsFailedAction
  | IRemoveOrderDetailsAction;

export function getOrderDetails(ingredients: Array<any>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    postOrder(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        });
      });
  };
}
