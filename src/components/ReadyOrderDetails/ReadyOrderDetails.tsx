import styles from "./ReadyOrderDetails.module.css"

import {useParams} from "react-router";
import {useAppSelector} from "../../utils/hooks";
import {useEffect, useState} from "react";
import {TIngredient} from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";


const today = new Date();
// type TOrderDetailsProps = {
//     order: {
//         name: string,
//         order: {
//             number: number,
//         },
//         success: boolean,
//     };
// }
export default function ReadyOrderDetails() {
    const {id} = useParams()
    const {orders} = useAppSelector(store => ({
        orders: store.wsReducer.orders,
    }));
    const order: any = orders.find((el: any) => el._id === id);
    const [data, setData] = useState<TIngredient[]>([]);
    const {ingredients} = useAppSelector((store) => store.ingredients);

    useEffect(() => {
        if (order && order.ingredients) {
            const items: TIngredient[] = order.ingredients.map(
                (item: any) =>
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

    const renderFillers = () => {
        return data.map((el, index) => {
            return (
                <div className={styles.items_box} key={index}>
                    <div className={styles.ingredient}>
                        <div className={`${styles.imageContainer} mr-4`}>
                            <img
                                className={styles.image}
                                src={el?.image_mobile}
                                alt={el?.name}
                            />
                        </div>
                        <p className="text text_type_main-default">{el?.name}</p>
                    </div>

                    <div className={styles.priceBlock}>
                        <p style={{whiteSpace: 'nowrap'}}
                           className=" text text_type_digits-default"
                        >
                            {`${(el.type === "bun") ? 2 : 1} x ${el.price}`}
                        </p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            );
        });
    };
    // {cardTotalCost(data)}

    return (
        <div className={`${styles.section} `}>
            <h2 className="text text_type_digits-default ml-10">#{order.number}</h2>
            <h3 className="text text_type_main-medium ml-10 mt-10">{order.name}</h3>
            <p className="text text_type_main-default ml-10 mt-3 text_color_success">{order.status === "done" ? "Выполнен" : "В работе"}</p>
            <h4 className="text text_type_main-medium ml-10 mt-15">Состав:</h4>
            <div className={`${styles.list}`}>
                {renderFillers()}
            </div>
            <div className={styles.footer}>
                <FormattedDate className=
                                   {`text
                                   text_type_main-default
                                   mr-2`}
                               date={today}/>
                <div className={styles.orderPrice}>
                    <p className="text text_type_digits-default mr-2">{cardTotalCost(data)}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>

        </div>
    );
}


