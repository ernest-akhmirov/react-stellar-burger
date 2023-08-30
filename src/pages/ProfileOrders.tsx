import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START} from "../services/constants";
import styles from "./FeedPage.module.css";
import OrderCard from "../components/OrderCard/OrderCard";

export function ProfileOrders() {
    const dispatch = useAppDispatch();
    const {usersOrders} = useAppSelector(store => ({
        usersOrders: store.wsReducer.userOrders,
    }));

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const cleanedToken = token?.replace("Bearer ", "");
        dispatch({type: WS_AUTH_CONNECTION_START, payload: `?token=${cleanedToken}`});
        return () => {dispatch({ type: WS_AUTH_CONNECTION_CLOSED })};
    }, [dispatch]);

    const reversedOrders = usersOrders.slice().reverse();

    return <div>
        <section className={styles.OrdersSection}>
            {reversedOrders.map((order) => (
                <OrderCard
                    key={order._id}
                    order={order}/>
            ))}
        </section>
    </div>;
}
