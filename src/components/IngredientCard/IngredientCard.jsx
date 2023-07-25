import cardStyle from "../IngredientCard/IngredientCard.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types'
import { useDispatch, useSelector } from "react-redux";
import { openIngredientDetails } from "../../services/actions/ingredientsDetailsActions";
import { useDrag } from "react-dnd";


export default function IngredientCard({ item }) {
    const dispatch = useDispatch();
    const { bun, notBuns } = useSelector((state) => state.burgerFilling);
    

    const openIngredientDetailsHandler = () => {
        dispatch(openIngredientDetails(item));
    };

    const [, dragRef] = useDrag({
        type: 'filler',
        item: item,
    });
 

    const count = useSelector((state) => {
        if (item.type === "bun") {
            return bun._id === item._id ? 2 : 0;
        }
        return notBuns.filter((i) => i._id === item._id).length;
    });

    

    return (
        <div className={`${cardStyle.card} mb-10`} onClick={openIngredientDetailsHandler} >
            <img src={item.image} alt={item.name} draggable ref={dragRef} />
            <div className={`${cardStyle.price} mt-1`}>
                <p className="text text_type_main-default mr-2">{item.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`${cardStyle.name} text text_type_main-default mt-1`}>
                {item.name}
            </p>
            <Counter count={count} />
        </div>
    );
}

IngredientCard.propTypes = {
    item: ingredientPropType,
    openModal: PropTypes.func,
};
