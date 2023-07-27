import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_ERROR,
    CLOSE_ORDER_DETAILS
  } from "../constants";
  
  const initialState = {
    orderData: null,
    orderRequest: false,
    orderSuccess: false,
    orderError: false,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLACE_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
          orderSuccess: false,
          orderError: false,
        };
      }
  
      case PLACE_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          orderSuccess: true,
          orderError: false,
          orderData: action.orderData,
        };
      }
  
      case PLACE_ORDER_ERROR: {
        return {
          ...state,
          orderRequest: false,
          orderSuccess: false,
          orderError: true,
        };
      }

      case CLOSE_ORDER_DETAILS: {
        return {
          ...state,
          orderData: null,
          orderRequest: false,
          orderSuccess: false,
          orderError: true,
        };
      }
  
      default:
        return state;
    }
  };
  