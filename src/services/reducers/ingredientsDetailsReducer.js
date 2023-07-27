import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants";

const initialState = {
    isModalOpen: false,
    selectedIngredient: null,
  };
  
  export const ingredientDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_INGREDIENT_DETAILS:
        return {
          ...state,
          isModalOpen: true,
          selectedIngredient: action.ingredient,
        };
      case CLOSE_INGREDIENT_DETAILS:
        return {
          ...state,
          isModalOpen: false,
          selectedIngredient: null,
        };
      default:
        return state;
    }
  };
