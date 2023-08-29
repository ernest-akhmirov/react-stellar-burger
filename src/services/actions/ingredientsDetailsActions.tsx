import {OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS} from "../constants";
import {TIngredient} from "../../utils/types";

type TOpenIngredientDetailsAction = {
    type: typeof OPEN_INGREDIENT_DETAILS;
    ingredient: TIngredient;
}

type TCloseIngredientDetailsAction = {
    type: typeof CLOSE_INGREDIENT_DETAILS;
}

export type TIngredientsDetailActions =
    | TOpenIngredientDetailsAction
    | TCloseIngredientDetailsAction;
export const openIngredientDetails = (ingredient: TIngredient): TOpenIngredientDetailsAction => ({
    type: OPEN_INGREDIENT_DETAILS,
    ingredient: ingredient,
});

export const closeIngredientDetails = (): TCloseIngredientDetailsAction => ({
    type: CLOSE_INGREDIENT_DETAILS,
});