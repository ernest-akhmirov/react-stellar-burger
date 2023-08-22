import styles from "./app.module.css";
import { useEffect, } from "react";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import { fetchIngredients } from "../../services/actions/ingredientsActions";
import { closeOrderDetails } from "../../services/actions/orderActions";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";

import {
    Routes,
    Route,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { RememberPassword } from "../../pages/RememberPassword";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { ProfileOrders } from "../../pages/ProfileOrders";
import { ProfileUser } from "../../pages/ProfileUser";
import { IngredientPage } from "../../pages/ingredientPage";
import { getUser } from "../../services/actions/authActions";
import {
    OnlyUnauthenticated,
    OnlyAuthenticated,
} from "../ProtectedRoute/ProtectedRoute";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import FeedPage from "../../pages/FeedPage";

function App() {
    const dispatch = useAppDispatch();
    const order = useAppSelector((state) => state.order.orderData);
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            dispatch(getUser());
        }
        dispatch(fetchIngredients());
    }, [dispatch]);

    const closeIngredientModal = () => {
        navigate(-1);
    };
    const closeOrderModal = () => {
        dispatch(closeOrderDetails());
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<Main />} />
                <Route
                    path="login"
                    element={<OnlyUnauthenticated element={<LoginPage />} />}
                />
                <Route
                    path="/register"
                    element={<OnlyUnauthenticated element={<RegistrationPage />} />}
                />
                <Route
                    path="/forgot-password"
                    element={<OnlyUnauthenticated element={<RememberPassword />} />}
                />
                <Route
                    path="/reset-password"
                    element={<OnlyUnauthenticated element={<ResetPasswordPage />} />}
                />
                <Route
                    path="/profile"
                    element={<OnlyAuthenticated element={<ProfilePage />} />}
                >
                    <Route path="/profile" element={<ProfileUser />} />
                    <Route path="/profile/orders" element={<ProfileOrders />} />
                </Route>
                <Route path="/ingredients/:id" element={<IngredientPage />} />
                <Route path="/feed" element={<FeedPage />}> </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="ingredients/:id"
                        element={
                            <Modal closeModal={closeIngredientModal}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
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
