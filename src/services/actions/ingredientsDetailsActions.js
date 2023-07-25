import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants";

export const openIngredientDetails = (ingredient) => ({
  type: OPEN_INGREDIENT_DETAILS,
  ingredient: ingredient,
});

export const closeIngredientDetails = () => ({
  type: CLOSE_INGREDIENT_DETAILS,
});