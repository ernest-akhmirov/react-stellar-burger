import cardStyle from "../IngredientCard/IngredientCard.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types'


export default function IngredientCard({ item, openModal }) {
    const onClick = () => {
        const childModal = <IngredientDetails item={item} openModal={openModal}/>;
        openModal(childModal);
    };

    return (
        <div className={`${cardStyle.card} mb-10`} onClick={onClick}>
            <img src={item.image} alt={item.name} />
            <div className={`${cardStyle.price} mt-1`}>
                <p className="text text_type_main-default mr-2">{item.price}</p>
                <CurrencyIcon />
            </div>
            <p className={`${cardStyle.name} text text_type_main-default mt-1`}>
                {item.name}
            </p>
            <Counter />
        </div>
     );
}

IngredientCard.propTypes = {
    item: ingredientPropType,
    openModal: PropTypes.func,
};