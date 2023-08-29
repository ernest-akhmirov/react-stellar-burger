import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_ERROR,
    CLOSE_ORDER_DETAILS,
    BASE_URL
} from "../constants";
import {checkResponse} from "../../utils/api";
import {AppDispatch,} from "../../utils/types";
import {clearBurgerIngredients} from "./burgerConstructorActions";

export type TOrderData = {
    success: boolean;
    name: string;
    order: {
        number: number;
    };
}

type TPlaceOrderRequestAction = {
    type: typeof PLACE_ORDER_REQUEST,
}

type TPlaceOrderSuccessAction = {
    type: typeof PLACE_ORDER_SUCCESS;
    orderData: TOrderData;
}

type TPlaceOrderError = {
    type: typeof PLACE_ORDER_ERROR;
}

type TCloseOrderDetails = {
    type: typeof CLOSE_ORDER_DETAILS,
}
export type TOrderActions =
    | TPlaceOrderRequestAction
    | TPlaceOrderSuccessAction
    | TPlaceOrderError
    | TCloseOrderDetails;

export const placeOrderRequest = (): TPlaceOrderRequestAction => ({
    type: PLACE_ORDER_REQUEST,
});

export const placeOrderSuccess = (orderData: TOrderData): TPlaceOrderSuccessAction => ({
    type: PLACE_ORDER_SUCCESS,
    orderData,
});

export const placeOrderError = (): TPlaceOrderError => ({
    type: PLACE_ORDER_ERROR,
});

export const closeOrderDetails = (): TCloseOrderDetails => ({
    type: CLOSE_ORDER_DETAILS,
});

export const placeOrder = (ingredientsIds: string[]) => {
    const token: string = localStorage.getItem("accessToken") || "";
    return async (dispatch: AppDispatch) => {
        dispatch(placeOrderRequest());

        try {
            const res = await fetch(`${BASE_URL}orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: JSON.stringify({ingredients: ingredientsIds}),
            });
            const orderData: TOrderData = await checkResponse(res);
            dispatch(placeOrderSuccess(orderData));
            dispatch(clearBurgerIngredients());
        } catch (error) {
            dispatch(placeOrderError());
            console.error(error);
        }
    };
};