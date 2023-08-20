import {store} from "../index";
import {rootReducer} from "../services/reducers/rootReducer";
import {AppActions, AppThunk} from "../services/actions/authActions";


export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch<TReturnType = void> = (
    action: AppActions | AppThunk<TReturnType>
) => TReturnType;
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


