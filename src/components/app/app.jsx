import styles from "./app.module.css";
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from "../Modal/Modal";
import { fetchIngredients } from "../../services/actions/ingredientsActions";
import { closeIngredientDetails } from "../../services/actions/ingredientsDetailsActions";
import { closeOrderDetails } from "../../services/actions/orderActions";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

function App() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.selectedIngredient.isModalOpen);
    const order = useSelector((state) => state.order.orderData);
    const selectedIngredient = useSelector((state) => state.selectedIngredient.selectedIngredient);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);



    const closeIngredientModal = () => {
        dispatch(closeIngredientDetails());
    };
    const closeOrderModal = () => {
        dispatch(closeOrderDetails());
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <Main />
            {isModalOpen && selectedIngredient && (
                <Modal closeModal={closeIngredientModal}>
                    <IngredientDetails item={selectedIngredient} />
                </Modal>
            )}
            {order && (
                <Modal closeModal={closeOrderModal}>
                    <OrderDetails order={order} />
                </Modal>
            )}
        </div>
    );
}

export default App;

