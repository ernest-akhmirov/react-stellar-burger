import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    BASE_URL
} from "../constants";
import { checkResponse } from "../../utils/api";
import {AppDispatch, TIngredient} from "../../utils/types";

type TGetIngredientsRequestAction = {
    type: typeof GET_INGREDIENTS_REQUEST;
}

type TGetIngredientsSuccess = {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: TIngredient[];
}

type TGetIngredientsErrorAction = {
    type: typeof GET_INGREDIENTS_ERROR;
}

export type TIngredientsActions =
    | TGetIngredientsRequestAction
    | TGetIngredientsSuccess
    | TGetIngredientsErrorAction;

export const getIngredientsRequest = (): TGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients: TIngredient[]): TGetIngredientsSuccess => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
});

export const getIngredientsError = (): TGetIngredientsErrorAction => ({
    type: GET_INGREDIENTS_ERROR,
});
interface IResponseData {
    data: TIngredient[];
    success: boolean;
}
export const fetchIngredients = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(getIngredientsRequest());

        try {
            const res = await fetch(`${BASE_URL}ingredients`);
            const resJson: IResponseData = await checkResponse(res);
            dispatch(getIngredientsSuccess(resJson.data));
        } catch (error) {
            dispatch(getIngredientsError());
            console.error(error);
        }
    };
};
