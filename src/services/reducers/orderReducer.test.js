import {initialState, orderReducer} from "./orderReducer";
import {CLOSE_ORDER_DETAILS, PLACE_ORDER_ERROR, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS} from "../constants";

const orderData = {
    id: 1,
    price: 222,
}

describe('order reducer test', () => {

    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle PLACE_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {type: PLACE_ORDER_REQUEST})).toEqual({
            ...initialState,
            orderRequest: true,
            isOrderModalOpen: true,
        });
    });

    it('should handle PLACE_ORDER_SUCCESS', () => {

        expect(orderReducer(initialState, {type: PLACE_ORDER_SUCCESS, orderData})).toEqual({
            ...initialState,
            orderSuccess: true,
            orderData: orderData,
            isOrderModalOpen: true,
        });
    });

    it('should handle PLACE_ORDER_ERROR', () => {
        expect(orderReducer(initialState, {type: PLACE_ORDER_ERROR})).toEqual({
            ...initialState,
            orderError: true,
        });
    });

    it('should handle CLOSE_ORDER_DETAILS', () => {
        expect(orderReducer(initialState, {type: CLOSE_ORDER_DETAILS})).toEqual({
            ...initialState,
            orderError: true,
        });
    });
})