import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
} from "../constants";
import {TIngredient} from "../../utils/types";
import {TIngredientsActions} from "../actions/ingredientsActions";

type TIngredientsState = {
    ingredients: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const ingredientsReducer = (state: TIngredientsState = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            };
        }

        case GET_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            };
        }
        default:
            return state;
    }
};
