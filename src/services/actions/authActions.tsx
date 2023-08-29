import {
    PASSWORD_RESET_PENDING,
    CLEAR_PASSWORD_RESET,
    REGISTER_USER,
    LOGIN_USER,
    SET_USER,
    UPDATE_USER,
    LOGOUT_USER,
} from "../constants";

import {request, requestWithTokenRefresh} from "../../utils/api";
import {ThunkAction} from "redux-thunk";
import {AppDispatch, RootState} from "../../utils/types";
import {TBurgerConstructorActions} from "./burgerConstructorActions";
import {TIngredientsActions} from "./ingredientsActions";
import {TIngredientsDetailActions} from "./ingredientsDetailsActions";
import {TOrderActions} from "./orderActions";
import {TWSActions, TWSAuthActions} from "./WSActions";

export type AppActions =
    | TBurgerConstructorActions
    | TIngredientsActions
    | TIngredientsDetailActions
    | TOrderActions
    | TAuthActions
    | TWSActions
    | TWSAuthActions
    ;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppActions
>;


export type TUserType = {
    email: string;
    name: string;
}

export type TAuthActions =
    | { type: typeof PASSWORD_RESET_PENDING }
    | { type: typeof CLEAR_PASSWORD_RESET }
    | { type: typeof REGISTER_USER; user: TUserType }
    | { type: typeof LOGIN_USER; user: TUserType }
    | { type: typeof SET_USER; user: TUserType }
    | { type: typeof UPDATE_USER; user: TUserType }
    | { type: typeof LOGOUT_USER };

export const requestRememberPassword = (email: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await request("password-reset", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email}),
            });
            dispatch({type: PASSWORD_RESET_PENDING});
        } catch (err) {
            console.log(err);
        }
    };
};

export const requestResetPassword = (password: string, code: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await request("password-reset/reset", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({password, token: code}),
            });
            dispatch({type: CLEAR_PASSWORD_RESET});
        } catch (err) {
            console.log(err);
        }
    };
};

export const register = (user: TUserType) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await request("auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });

            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            dispatch({type: REGISTER_USER, user: response.user});
        } catch (err) {
            console.log(err);
        }
    };
};

export const login = (user: TUserType) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await request("auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });

            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            dispatch({type: LOGIN_USER, user: response.user});
        } catch (err) {
            console.log(err);
        }
    };
};

export const getUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await requestWithTokenRefresh("auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("accessToken"),
                },
            });

            dispatch({type: SET_USER, user: response.user});
        } catch (err) {
            console.log(err);
        }
    };
};

export const updateUser = (user: TUserType) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await requestWithTokenRefresh("auth/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem("accessToken"),
                },
                body: JSON.stringify(user),
            });

            dispatch({type: UPDATE_USER, user: response.user});
        } catch (err) {
            console.log(err);
        }
    };
};

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            await request("auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    token: localStorage.getItem("refreshToken"),
                }),
            });

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch({type: LOGOUT_USER});
        } catch (err) {
            console.log(err);
        }
    };
};
