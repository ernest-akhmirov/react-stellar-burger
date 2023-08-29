import {burgerConstructorReducer, initialState} from "./burgerConstructorReducer";
import {ADD_BURGER_INGREDIENT, CLEAR_INGREDIENT, MOVE_NOTBUNS_INGREDIENT, REMOVE_BURGER_INGREDIENT} from "../constants";

const bunIngredient = {
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

const notBunIngredient = {
    "_id": "60666c42cc7b410027a1a9b5",
    "name": "Говяжий метеорит (отбивная)",
    "type": "main",
    "proteins": 800,
    "fat": 800,
    "carbohydrates": 300,
    "calories": 2674,
    "price": 3000,
    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
    "__v": 0
}

const TestState = {
    bun: {test: "bun"},
    notBuns: [{first: 1, additionalId: "id1"}, {second: 2, additionalId: "id2"}]
};



describe('burgerConstructor reducer test', () => {

    it('should return initial state', () => {
        expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_BURGER_INGREDIENT bun', () => {
        expect(burgerConstructorReducer(initialState,
            {type: ADD_BURGER_INGREDIENT, ingredient: bunIngredient}))
            .toEqual({...initialState, bun: bunIngredient})
    });

    it('should handle ADD_BURGER_INGREDIENT notBun', () => {
        expect(burgerConstructorReducer(initialState,
            {type: ADD_BURGER_INGREDIENT, ingredient: notBunIngredient}))
            .toEqual({...initialState, notBuns: [notBunIngredient]})
    });

    it('should handle REMOVE_BURGER_INGREDIENT', () => {
        expect(burgerConstructorReducer(TestState, {
            type: REMOVE_BURGER_INGREDIENT,
            additionalId: "id1"
        })).toEqual({...TestState, notBuns: [{second: 2, additionalId: "id2"}]})
    });

    it('should handle MOVE_NOTBUNS_INGREDIENT', () => {
        const dragIndex = 0;
        const hoverIndex = 1;
        expect(burgerConstructorReducer(TestState, {
            type: MOVE_NOTBUNS_INGREDIENT,
            payload: {dragIndex, hoverIndex}
        })).toEqual({...TestState,
            notBuns: [{second: 2, additionalId: "id2"}, {first: 1, additionalId: "id1"}]});
    });

    it('should handle CLEAR_INGREDIENT', () => {
        expect(burgerConstructorReducer(TestState, {type: CLEAR_INGREDIENT})).toEqual(initialState)
    });


})