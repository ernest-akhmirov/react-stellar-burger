import {initialState, wsReducer} from "./WSReducers";
import {
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_AUTH_ORDERS,
    WS_GET_ORDERS
} from "../constants";

const orders = {
    orders: [{order: 1}, {order: 2}],
    total: 1000,
    totalToday: 2
};

const userOrders = {
    orders: [{order: 1}, {order: 2}],
    total: 1000,
    totalToday: 2
}

describe('ws reducer tests', () => {

    it('should return initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle WS_CONNECTION_START', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_START, payload: ''}))
            .toEqual({
                ...initialState,
            });
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS, payload: ''}))
            .toEqual({
                ...initialState,
                wsConnected: true,
            });
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_ERROR, payload: 'err'}))
            .toEqual({
                ...initialState,
                wsError: 'err'
            });
    });

    it('should handle WS_GET_ORDERS', () => {
        expect(wsReducer(initialState, {type: WS_GET_ORDERS, payload: orders})).toEqual({
            ...initialState,
            wsConnected: true,
            orders: [{order: 1}, {order: 2}],
            total: 1000,
            totalToday: 2,
        });
    });

    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {type: WS_CONNECTION_CLOSED, payload: ''}))
            .toEqual({
                ...initialState
            });
    });
/////
    it('should handle WS_AUTH_CONNECTION_START', () => {
        expect(wsReducer(initialState, {type: WS_AUTH_CONNECTION_START, payload: ''}))
            .toEqual({
                ...initialState,
            });
    });

    it('should handle WS_AUTH_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, {type: WS_AUTH_CONNECTION_SUCCESS, payload: ''}))
            .toEqual({
                ...initialState,
                wsAuthConnected: true,
            });
    });

    it('should handle WS_AUTH_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {type: WS_AUTH_CONNECTION_ERROR, payload: 'err'}))
            .toEqual({
                ...initialState,
                wsAuthError: 'err'
            });
    });

    it('should handle WS_GET_AUTH_ORDERS', () => {
        expect(wsReducer(initialState, {type: WS_GET_AUTH_ORDERS, payload: userOrders})).toEqual({
            ...initialState,
            wsAuthConnected: true,
            userOrders: [{order: 1}, {order: 2}],
            total: 1000,
            totalToday: 2,
        });
    });

    it('should handle WS_AUTH_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {type: WS_AUTH_CONNECTION_CLOSED, payload: ''}))
            .toEqual({
                ...initialState
            });
    });

});