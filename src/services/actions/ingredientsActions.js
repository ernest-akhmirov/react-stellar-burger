import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    BASE_URL
} from "../constants";
import { checkResponse } from "../../utils/api";

export const getIngredientsRequest = () => ({
    type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredients) => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
});

export const getIngredientsError = () => ({
    type: GET_INGREDIENTS_ERROR,
});

export const fetchIngredients = () => {
    return async (dispatch) => {
        dispatch(getIngredientsRequest());

        try {
            const res = await fetch(`${BASE_URL}ingredients`);
            const resJson = await checkResponse(res);
            dispatch(getIngredientsSuccess(resJson.data));
        } catch (error) {
            dispatch(getIngredientsError());
            console.error(error);
        }
    };
};
