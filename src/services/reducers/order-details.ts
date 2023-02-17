import {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  REMOVE_ORDER_DETAILS,
  TOrderDetailsActions,
} from "../actions/order-details";

type TOrderDetailsState = {
  orderDetails: null | {
    success: boolean;
    name: string;
    _id: string;
    order: {
      ingredients: [];
      owner: {};
      status: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      number: number;
      price: number;
    };
  };
  orderDetailsRequest: boolean;
  orderDetailsFailed: boolean;
};

const initialState: TOrderDetailsState = {
  orderDetails: null,
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TOrderDetailsState => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        orderDetailsRequest: true,
      };
    }
    case ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderDetails: action.payload,
        orderDetailsRequest: false,
        orderDetailsFailed: false,
      };
    }
    case ORDER_DETAILS_FAILED: {
      return {
        ...state,
        orderDetailsFailed: true,
        orderDetailsRequest: false,
      };
    }
    case REMOVE_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: null,
      };
    }
    default: {
      return state;
    }
  }
};
