import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_ERROR,
    CLOSE_ORDER_DETAILS,
    BASE_URL
} from "../constants";
import {checkResponse} from "../../utils/api";
import {AppDispatch, TIngredient} from "../../utils/types";

type TPlaceOrderRequestAction = {
    type: typeof PLACE_ORDER_REQUEST,
}

type TPlaceOrderSuccessAction = {
    type: typeof PLACE_ORDER_SUCCESS;
    orderData: TIngredient[];
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

export const placeOrderSuccess = (orderData: TIngredient[]): TPlaceOrderSuccessAction => ({
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
    return async (dispatch: AppDispatch) => {
        dispatch(placeOrderRequest());

        try {
            const res = await fetch(`${BASE_URL}orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ingredients: ingredientsIds}),
            });
            const orderData: TIngredient[] = await checkResponse(res);
            dispatch(placeOrderSuccess(orderData));
        } catch (error) {
            dispatch(placeOrderError());
            console.error(error);
        }
    };
};