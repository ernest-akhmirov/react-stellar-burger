import cardStyle from "../IngredientCard/IngredientCard.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient} from "../../utils/types";
import {useDrag} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../utils/hooks";


const IngredientCard = ({item}: { item: TIngredient }) => {
    const {bun, notBuns} = useAppSelector((state) => state.burgerFilling);
    const location = useLocation();
    const navigate = useNavigate();

    const openIngredientDetailsHandler = () => {
        navigate(`/ingredients/${item._id}`, {state: {background: location}})
    };

    const [, dragRef] = useDrag({
        type: 'filler',
        item: item,
    });


    const count = useAppSelector((state) => {
        if (item.type === "bun") {
            return (bun as TIngredient)._id === item._id ? 2 : 0;
        }
        return notBuns.filter((i: TIngredient) => i._id === item._id).length;
    });


    return (
        <div className={`${cardStyle.card} mb-10`} onClick={openIngredientDetailsHandler}>
            <img className='ingredientImg' src={item.image} alt={item.name} draggable ref={dragRef}/>
            <div className={`${cardStyle.price} mt-1`}>
                <p className="text text_type_main-default mr-2">{item.price}</p>
                <CurrencyIcon type={'primary'}/>
            </div>
            <p className={`${cardStyle.name} text text_type_main-default mt-1`}>
                {item.name}
            </p>
            <Counter count={count}/>
        </div>
    );
}

export default IngredientCard;
