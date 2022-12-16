import {
  postOrder
} from "../../utils/burger-api";

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED';
export const REMOVE_ORDER_DETAILS = 'REMOVE_ORDER_DETAILS';

export function getOrderDetails(ingredients) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    postOrder(ingredients)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res
          })
        }
      }).catch(e => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        })
      })
  }
}
