import style from "./style.module.css"
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';

export function IngredientPage() {
    return (
        <div className={style.ingredient}>
            <IngredientDetails/>
        </div>
    );
}
