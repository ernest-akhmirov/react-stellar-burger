import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants";
import {TIngredientsDetailActions} from "../actions/ingredientsDetailsActions";

type TIngredientsDetailsState = {
    isModalOpen: boolean;
    selectedIngredient: null;
}

const initialState: TIngredientsDetailsState = {
  isModalOpen: false,
  selectedIngredient: null,
};

export const ingredientDetailsReducer = (state: TIngredientsDetailsState = initialState, action: TIngredientsDetailActions) => {
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
