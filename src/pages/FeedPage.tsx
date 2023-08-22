import React, {useEffect,} from 'react';
import styles from "./FeedPage.module.css"
import OrderCard from "../components/OrderCard/OrderCard";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {WS_CONNECTION_START, WS_CONNECTION_CLOSED} from "../services/constants";
import {TWSOrder} from "../services/actions/WSActions";

function FeedPage() {

    const {orders} = useAppSelector(store => ({
        orders: store.wsReducer.orders,
    }));

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: `/all`});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED, payload: ''})
        };
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <h2 className={"text text_type_main-large pt-10 pb-5"}>Лента Заказов</h2>
            <div>
                {orders.map((order:TWSOrder) => (
                    <OrderCard
                        key={order._id}
                        order={order}/>
                ))}

            </div>
        </main>
    );
}

export default FeedPage;