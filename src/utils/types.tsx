
import {store} from "../index";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type DispatchFunc = () => AppDispatch;

export type TIngredient = {
        _id: string;
        image: string;
        name: string;
        price: number;
        type: string;
        proteins: number;
        fat: number;
        carbohydrates: number;
        calories: number;
        image_mobile: string;
        image_large: string;
        __v: number;
        additionalId?: string;
        index?: number;
};
