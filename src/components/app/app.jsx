import styles from "./app.module.css";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from "../Modal/Modal";
import { fetchIngredients } from "../../services/actions/ingredientsActions";
import { closeIngredientDetails } from "../../services/actions/ingredientsDetailsActions";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function App() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.selectedIngredient.isModalOpen);
    const selectedIngredient = useSelector((state) => state.selectedIngredient.selectedIngredient);

    useEffect(() => {
        dispatch(fetchIngredients());
      }, [dispatch]);

    
    
      const closeModal = () => {
        dispatch(closeIngredientDetails());
      };
    
    return (
        <div className={styles.app}>
            <AppHeader />
            <Main  />
            {isModalOpen && selectedIngredient && (
                <Modal closeModal={closeModal}>
                    <IngredientDetails item={selectedIngredient} />
                </Modal>
            )}
        </div>
    );
}

export default App;

{/* <Modal closeModal={closeModal} ></Modal> */}