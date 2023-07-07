import styles from "./app.module.css";
import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from "../Modal/Modal";

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [childModal, setChildModal] = useState('')

    const openModal = (noModal) => {
        setIsModalOpen(true);
        setChildModal(noModal);
    }

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
                if (!res.ok) {
                    throw new Error(`Ошибка: ${res.status} - ${res.statusText}`);
                }
            const resJson = await res.json();
            setIngredients(resJson.data);
            } 
            catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);
    

    return (
        <div className={styles.app}>
            <AppHeader />
            <Main data={ingredients} openModal={openModal} />
            {isModalOpen && (
            <Modal  closeModal={closeModal} >
                {childModal}
            </Modal>
            )}
        </div>
    );
}

export default App;