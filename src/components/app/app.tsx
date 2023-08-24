import styles from "./app.module.css";
import {useEffect,} from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import {fetchIngredients} from "../../services/actions/ingredientsActions";
import {closeOrderDetails} from "../../services/actions/orderActions";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ReadyOrderDetails from "../ReadyOrderDetails/ReadyOrderDetails";

import {
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {LoginPage} from "../../pages/LoginPage";
import {RegistrationPage} from "../../pages/RegistrationPage";
import {RememberPassword} from "../../pages/RememberPassword";
import {ResetPasswordPage} from "../../pages/ResetPasswordPage";
import {ProfilePage} from "../../pages/ProfilePage";
import {ProfileOrders} from "../../pages/ProfileOrders";
import {ProfileUser} from "../../pages/ProfileUser";
import {IngredientPage} from "../../pages/ingredientPage";
import {ReadyOrderPage} from "../../pages/ReadyOrderPage";
import {getUser} from "../../services/actions/authActions";
import {
    OnlyUnauthenticated,
    OnlyAuthenticated,
} from "../ProtectedRoute/ProtectedRoute";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import FeedPage from "../../pages/FeedPage";
import OrderDetails from "../OrderDetails/OrderDetails";
import {WS_CONNECTION_START} from "../../services/constants";
import {ReadyUserOrderPage} from "../../pages/ReadyUserOrderPage";
import Preloader from "../Preloader/Preloader";

function App() {
    const dispatch = useAppDispatch();
    const order = useAppSelector((state) => state.order.orderData);
    const isOrderModalOpen = useAppSelector((state) => state.order.isOrderModalOpen);
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    useEffect(() => {
        const token = localStorage.getItem("accessToken"); //здесь токен с bearer
        if (token) {
            dispatch(getUser());
        }
        dispatch(fetchIngredients());
        dispatch({type: WS_CONNECTION_START, payload: `/all`});
    }, [dispatch]);

    const closeIngredientModal = () => {
        navigate(-1);
    };
    const closeOrderModal = () => {
        dispatch(closeOrderDetails());
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/" element={<Main/>}/>
                <Route
                    path="login"
                    element={<OnlyUnauthenticated element={<LoginPage/>}/>}
                />
                <Route
                    path="/register"
                    element={<OnlyUnauthenticated element={<RegistrationPage/>}/>}
                />
                <Route
                    path="/forgot-password"
                    element={<OnlyUnauthenticated element={<RememberPassword/>}/>}
                />
                <Route
                    path="/reset-password"
                    element={<OnlyUnauthenticated element={<ResetPasswordPage/>}/>}
                />
                <Route
                    path="/profile"
                    element={<OnlyAuthenticated element={<ProfilePage/>}/>}
                >
                    <Route path="/profile" element={<ProfileUser/>}/>
                    <Route path="/profile/orders" element={<ProfileOrders/>}/>

                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage/>}/>
                <Route path="/feed" element={<FeedPage/>}> </Route>
                <Route path="/feed/:id" element={<ReadyOrderPage/>}/>
                <Route path="/profile/orders/:id" element={<OnlyAuthenticated element={<ReadyUserOrderPage/>}/>}/>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="ingredients/:id"
                        element={
                            <Modal closeModal={closeIngredientModal}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path="feed/:id"
                        element={
                            <Modal closeModal={closeIngredientModal}>
                                <ReadyOrderDetails/>
                            </Modal>
                        }
                    />
                    <Route
                        path="/profile/orders/:id"
                        element={
                            <Modal closeModal={closeIngredientModal}>
                                <ReadyOrderDetails/>
                            </Modal>
                        }
                    />
                </Routes>
            )}
            {isOrderModalOpen && (
                <Modal closeModal={closeOrderModal}>
                    {order ?
                        <OrderDetails order={order}/>
                        :
                        <div>
                            <Preloader/>
                            <p className='text text_type_main-medium mt-5'>
                                Оформляем заказ<br />Подождите 15 секунд
                            </p>
                        </div>
                    }
                </Modal>
            )}
        </div>
    );
}

export default App;


