import {authReducer, initialState} from "./authReducers";
import {
    CLEAR_PASSWORD_RESET,
    LOGIN_USER,
    LOGOUT_USER,
    PASSWORD_RESET_PENDING,
    REGISTER_USER,
    SET_USER,
    UPDATE_USER,
} from "../constants";

const user = {
    email: "test@test.com",
    name: "testName"};

describe('auth reducer test', () => {

    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOGIN_USER', () => {

        expect(authReducer(initialState, {type: LOGIN_USER, user} )).toEqual({
            ...initialState,
            user: user,
            isAuthorized: true,
        });
    });

    it('should handle REGISTER_USER', () => {
        expect(authReducer(initialState, {type: REGISTER_USER, user} )).toEqual({
            ...initialState,
            user: user,
            isAuthorized: true,
        })
    });



});