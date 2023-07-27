import {
    ADD_BURGER_INGREDIENT,
    REMOVE_BURGER_INGREDIENT,
     MOVE_NOTBUNS_INGREDIENT
} from "../constants";
import { nanoid } from "nanoid";

export const addBurgerIngredient = (ingredient) => ({
    type: ADD_BURGER_INGREDIENT,
    ingredient: {
        ...ingredient,
        additionalId: nanoid(),
    },
}); 

export const removeBurgedIngredient = (additionalId) => ({
    type: REMOVE_BURGER_INGREDIENT,
    additionalId: additionalId,
  });

  export const moveNotBunsIngredient = (dragIndex, hoverIndex) => ({
    type: MOVE_NOTBUNS_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  });