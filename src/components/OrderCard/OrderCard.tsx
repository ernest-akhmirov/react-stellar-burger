import styles from "./OrderCard.module.css"
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../utils/hooks";
import {TWSOrder} from "../../services/actions/WSActions";
import {useEffect, useState} from "react";
import {TIngredient} from "../../utils/types";
import {useLocation, useNavigate} from "react-router-dom";

const today = new Date();
type OrderCardProps = {
    order: TWSOrder
}

function OrderCard({order}: OrderCardProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState<TIngredient[]>([]);
    const {ingredients} = useAppSelector((store) => store.ingredients);
    const [fillers, setFillers] = useState<TIngredient[]>([]);

    useEffect(() => {
        if (order && order.ingredients) {
            const items: TIngredient[] = order.ingredients.map(
                (item) =>
                    ingredients.find(
                        (newIngredient) => newIngredient._id === item
                    ) as TIngredient
            );
            setData(items);
        }
    }, [ingredients]);

    const cardTotalCost = (ingredients: TIngredient[]) =>
        ingredients.reduce(
            (accum, current) => accum + (current.type === "bun" ? current.price * 2 : current.price),
            0
        );

    const openOrderHandler = () => {
        navigate(`/feed/${order._id}`, { state: { background: location } })
    };

    return (
        <div className={styles.orderCard} onClick={openOrderHandler}>
            <div className={styles.orderCardHeader}>
                <p className={`text text_type_digits-default`}>#{order.number}</p>
                <FormattedDate className=
                                   {`text
                                   text_type_main-default
                                   text_color_inactive
                                   mr-2`}
                               date={today}
                />
            </div>
            <p className={`${styles.orderBurgerName} text text_type_main-medium`}>
                {order.name}
            </p>
            <div className={styles.orderFooter}>
                <div className={styles.orderIngredients}>
                    {data?.map((newIngredient, index) => {
                        if (index === 0 && data?.length > 5) {
                            return (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        className={styles.image}
                                        src={newIngredient?.image_mobile}
                                        alt={newIngredient?.name}
                                    />
                                    <p className={`${styles.count} text text_type_main-default`}>+{data?.length - 5}</p>
                                </div>
                            );
                        } else if (index <= 5) {
                            return (
                                <div key={index} className={styles.imageContainer}>
                                    <img
                                        className={styles.image}
                                        src={newIngredient?.image_mobile}
                                        alt={newIngredient?.name}
                                    />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                <div className={styles.orderPrice}>
                    <p className="text text_type_digits-default mr-2">{cardTotalCost(data)}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </div>
    );
}

export default OrderCard;