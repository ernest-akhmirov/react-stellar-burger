import { ingredientsReducer } from "./ingredientsReducer"
import { ingredientDetailsReducer} from './ingredientsDetailsReducer';
import { burgerConstructorReducer } from "./burgerConstructorReducer";
import { orderReducer } from "./orderReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredient: ingredientDetailsReducer,
    burgerFilling: burgerConstructorReducer,
    order: orderReducer,
    
});

