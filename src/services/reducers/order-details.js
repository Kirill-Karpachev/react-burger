import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED
} from "../actions/ingredients";

const initialState = {
  orderDetails: {},
  orderDetailsRequest: false,
  orderDetailsFailed: false,
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
      }
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetails: action.payload,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      }
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false,
      }
    }
    default: {
      return state;
    }
  }
}
