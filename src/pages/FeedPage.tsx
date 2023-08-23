import React, {useEffect,} from 'react';
import styles from "./FeedPage.module.css"
import OrderCard from "../components/OrderCard/OrderCard";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from "../services/constants";
import {TWSOrder} from "../services/actions/WSActions";
import constructorStyle from "../components/BurgerConstructor/BurgerConstructor.module.css";

function FeedPage() {

    const {orders, total, totalToday} = useAppSelector(store => ({
        orders: store.wsReducer.orders,
        total: store.wsReducer.total,
        totalToday: store.wsReducer.totalToday,
    }));
    return (
        <main className={styles.wrapper}>

            <h2 className={"text text_type_main-large pt-10 pb-5"}>Лента Заказов</h2>
            <div className={styles.main}>
                <section className={styles.OrdersSection}>
                    {orders.map((order: TWSOrder) => (
                        <OrderCard
                            key={order._id}
                            order={order}/>
                    ))}
                </section>
                <section className={styles.OrdersTable}>
                    <div className={styles.OrdersStatus}>
                        <div className={styles.Done}>
                            <h2 className={"text text_type_main-medium mb-6"}>Готовы:</h2>
                            <ul className={styles.OrdersList}>
                                {orders.slice(0, 20).map((num: TWSOrder) => (
                                    num.status === "done" ? (
                                        <li key={num._id}
                                            className={"text text_type_digits-default  text_color_success"}>
                                            {num.number}
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </div>
                        <div className={styles.Done}>
                            <h2 className={"text text_type_main-medium mb-6"}>В работе:</h2>
                            <ul className={styles.OrdersList}>
                                {orders.slice(0, 20).map((num: TWSOrder) => (
                                    num.status === "pending" ? (
                                        <li key={num._id}
                                            className={"text text_type_digits-default "}>
                                            {num.number}
                                        </li>
                                    ) : null
                                ))}
                            </ul>
                        </div>
                    </div>
                    <p className={"text text_type_main-medium mt-15"}>Выполнено за все время:</p>
                    <p className={`${styles.glow} text text_type_digits-large mt-6`}>{total}</p>
                    <p className={"text text_type_main-medium mt-15"}>Выполнено за все время:</p>
                    <p className={`${styles.glow} text text_type_digits-large mt-6`}>{totalToday}</p>
                </section>
            </div>
        </main>
    );
}

export default FeedPage;