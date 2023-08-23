import styles from "./ReadyOrderDetails.module.css"

import {useParams} from "react-router";
import {useAppSelector} from "../../utils/hooks";
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
    const {ingredients} = useAppSelector((store) => store.ingredients);
    const {orders} = useAppSelector(store => ({
        orders: store.wsReducer.orders,}));
    const {id} = useParams();

    const order = orders && orders.find((elem) => elem._id === id);
    const orderIngredients: any = [];

    order?.ingredients.forEach((order) => {
        const foundIngredient = ingredients.find(
            (ingredient) => ingredient._id === order
        );
        if (foundIngredient) {
            orderIngredients.push(foundIngredient);
        }
    });

    const cardTotalCost = (ingredients: TIngredient[]) =>
        ingredients.reduce(
            (accum, current) => accum + (current.type === "bun" ? current.price * 2 : current.price),
            0
        );

    const renderFillers = () => {
        return orderIngredients.map((el:any, index:any) => {
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
            <h2 className="text text_type_digits-default ml-10">#{order?.number}</h2>
            <h3 className="text text_type_main-medium ml-10 mt-10">{order?.name}</h3>
            <p className="text text_type_main-default ml-10 mt-3 text_color_success">{order?.status === "done" ? "Выполнен" : "В работе"}</p>
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
                    <p className="text text_type_digits-default mr-2">{cardTotalCost(orderIngredients)}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>

        </div>
    );
}


