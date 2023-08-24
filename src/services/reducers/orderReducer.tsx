import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  CLOSE_ORDER_DETAILS
} from "../constants";
import {TOrderActions, TOrderData,} from "../actions/orderActions";

type TOrderState = {
    orderData: null | TOrderData;
    orderRequest: boolean;
    orderSuccess: boolean;
    orderError: boolean;
    isOrderModalOpen: boolean,
}

const initialState:TOrderState = {
  orderData: null,
  orderRequest: false,
  orderSuccess: false,
  orderError: false,
  isOrderModalOpen: false,
};

export const orderReducer = (state: TOrderState = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderSuccess: false,
        orderError: false,
        isOrderModalOpen: true,
      };
    }

    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        orderError: false,
        orderData: action.orderData,
        isOrderModalOpen: true,
      };
    }

    case PLACE_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
        isOrderModalOpen: false,
      };
    }

    case CLOSE_ORDER_DETAILS: {
      return {
        ...state,
        orderData: null,
        orderRequest: false,
        orderSuccess: false,
        orderError: true,
        isOrderModalOpen: false,
      };
    }

    default:
      return state;
  }
};
  