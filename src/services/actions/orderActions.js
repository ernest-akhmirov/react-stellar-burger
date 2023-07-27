import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_ERROR,
    CLOSE_ORDER_DETAILS,
    BASE_URL
  } from "../constants";
import { checkResponse } from "../../utils/api";

  export const placeOrderRequest = () => ({
    type: PLACE_ORDER_REQUEST,
  });
  
  export const placeOrderSuccess = (orderData) => ({
    type: PLACE_ORDER_SUCCESS,
    orderData,
  });
  
  export const placeOrderError = () => ({
    type: PLACE_ORDER_ERROR,
  });

  export const closeOrderDetails = () => ({
    type: CLOSE_ORDER_DETAILS,
  });

  export const placeOrder = (ingredientsIds) => {
    return async (dispatch) => {
      dispatch(placeOrderRequest());
  
      try {
        const res = await fetch(`${BASE_URL}orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientsIds }),
        });
        const orderData = await checkResponse(res);
        dispatch(placeOrderSuccess(orderData));
      } catch (error) {
        dispatch(placeOrderError());
        console.error(error);
      }
    };
  };