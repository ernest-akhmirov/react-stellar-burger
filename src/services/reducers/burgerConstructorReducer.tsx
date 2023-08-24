import {ADD_BURGER_INGREDIENT, CLEAR_INGREDIENT, MOVE_NOTBUNS_INGREDIENT, REMOVE_BURGER_INGREDIENT} from "../constants";

import update from "immutability-helper";
import {TIngredient} from "../../utils/types";
import {TBurgerConstructorActions} from "../actions/burgerConstructorActions";

type TBurgerConstructorState = {
    bun: {} | TIngredient;
    notBuns: TIngredient[];
};

const initialState: TBurgerConstructorState = {
    bun: {},
    notBuns: [],
};

export const burgerConstructorReducer = (state: TBurgerConstructorState = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
    switch (action.type) {
        case ADD_BURGER_INGREDIENT: {
            if (action.ingredient.type === "bun") {
                return {...state, bun: action.ingredient};
            }
            return {
                ...state,
                notBuns: [...state.notBuns, action.ingredient],
            };
        }
        case REMOVE_BURGER_INGREDIENT: {
            return {
                ...state,
                notBuns: state.notBuns.filter((ingredient) => ingredient.additionalId !== action.additionalId),
            };
        }
        case MOVE_NOTBUNS_INGREDIENT: {
            const {dragIndex, hoverIndex} = action.payload;
            const updatedNotBuns = update(state.notBuns, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, state.notBuns[dragIndex]],
                ],
            });
            return {
                ...state,
                notBuns: updatedNotBuns,
            };
        }

        case CLEAR_INGREDIENT: {
            return initialState;
        }

        default:
            return state;
    }
}