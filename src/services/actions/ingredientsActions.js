import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
} from "../constants";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

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
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status} - ${res.statusText}`);
            }

            const resJson = await res.json();
            dispatch(getIngredientsSuccess(resJson.data));
        } catch (error) {
            dispatch(getIngredientsError());
            console.error(error);
        }
    };
};
