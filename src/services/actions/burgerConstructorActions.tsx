import {
    ADD_BURGER_INGREDIENT,
    REMOVE_BURGER_INGREDIENT,
    MOVE_NOTBUNS_INGREDIENT,
    CLEAR_INGREDIENT
} from "../constants";
import {nanoid} from "nanoid";
import {TIngredient} from "../../utils/types";

type TAddBurgerIngredientAction = {
    type: typeof ADD_BURGER_INGREDIENT;
    ingredient: TIngredient;
}

type TRemoveBurgerIngredientAction = {
    type: typeof REMOVE_BURGER_INGREDIENT;
    additionalId: string;
}

type TMoveNotBunsIngredientAction = {
    type: typeof MOVE_NOTBUNS_INGREDIENT;
    payload: {
        dragIndex: number;
        hoverIndex: number;
    };
}

type TClearBurgerIngredientAction = {
    type: typeof CLEAR_INGREDIENT;
};

export type TBurgerConstructorActions =
    | TAddBurgerIngredientAction
    | TRemoveBurgerIngredientAction
    | TMoveNotBunsIngredientAction
    | TClearBurgerIngredientAction;


export const addBurgerIngredient = (ingredient: TIngredient): TAddBurgerIngredientAction => ({
    type: ADD_BURGER_INGREDIENT,
    ingredient: {
        ...ingredient,
        additionalId: nanoid(),
    },
});

export const removeBurgerIngredient = (additionalId: string): TRemoveBurgerIngredientAction => ({
    type: REMOVE_BURGER_INGREDIENT,
    additionalId: additionalId,
});

export const moveNotBunsIngredient = (dragIndex: number, hoverIndex: number,): TMoveNotBunsIngredientAction => ({
    type: MOVE_NOTBUNS_INGREDIENT,
    payload: {dragIndex, hoverIndex,},
});

export const clearBurgerIngredients = () => ({
    type: CLEAR_INGREDIENT,
});