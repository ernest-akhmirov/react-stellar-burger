import {ingredientDetailsReducer, initialState} from "./ingredientsDetailsReducer";
import {OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS} from "../constants";

const ingredient = {test: 1};

describe('ingredient detail tests', () => {

    it('should return initial state', () => {
        expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle OPEN_INGREDIENT_DETAILS', () => {

        expect(ingredientDetailsReducer(initialState, {
            type: OPEN_INGREDIENT_DETAILS,
            ingredient
        })).toEqual({...initialState,
            isModalOpen: true,
            selectedIngredient: ingredient,
        });
    });

    it('should handle CLOSE_INGREDIENT_DETAILS', () => {
       const OpenedModalState = {
           isModalOpen: true,
           selectedIngredient: ingredient,
       }
       expect(ingredientDetailsReducer(OpenedModalState, {type: CLOSE_INGREDIENT_DETAILS})).toEqual(initialState)
    });

});