import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_ERROR,
    CLOSE_ORDER_DETAILS,
  } from "../constants";

  const API_URL = "https://norma.nomoreparties.space/api/orders";

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
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientsIds }),
        });
  
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} - ${response.statusText}`);
        }
  
        const orderData = await response.json();
        dispatch(placeOrderSuccess(orderData));
      } catch (error) {
        dispatch(placeOrderError());
        console.error(error);
      }
    };
  };