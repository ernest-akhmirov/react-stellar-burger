import {ingredientsReducer, initialState} from "./ingredientsReducer";
import {GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR} from "../constants";

const testIngredient= {
    "_id": "60666c42cc7b410027a1a9b1",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 1255,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
};

describe('ingredient reducer tests', () => {
    it('should return initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should return request state', () => {
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_REQUEST})).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        });
    });

    it('should return success state', () => {
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_SUCCESS, ingredients: [testIngredient]})
        ).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: [testIngredient]
        });
    });

    it('should return error state', () => {
        expect(ingredientsReducer(initialState, {type: GET_INGREDIENTS_ERROR})).toEqual({
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true
        });
    });


})