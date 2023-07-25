import {
    ADD_BURGER_INGREDIENT,
    REMOVE_BURGER_INGREDIENT,
} from "../constants";

const initialState = {
    bun: {},
    notBuns: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BURGER_INGREDIENT: {
            if (action.ingredient.type === "bun") {
                return { ...state, bun: action.ingredient };
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

        default:
            return state;
    }
}