import { NavLink, Outlet, useLocation } from "react-router-dom";
import style from "./profilePage.module.css";
import { logout } from "../services/actions/authActions";
import {useAppDispatch} from "../utils/hooks";


const styleActive = `${style.link} ${style.active} text text_type_main-medium`;
const styleInactive = `${style.link} text text_type_main-medium text_color_inactive`;

export function ProfilePage() {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleNavLinkClick = () => {
        dispatch(logout());
    };

    return (
        <div className={`${style.wrapper}`}>
            <nav className={`${style.nav} mr-15 ml-6`}>
                <NavLink
                    className={
                        location.pathname === "/profile" ? styleActive : styleInactive
                    }
                    to="/profile"
                >
                    Профиль
                </NavLink>
                <NavLink
                    className={
                        location.pathname === "/profile/orders"
                            ? styleActive
                            : styleInactive
                    }
                    to="/profile/orders"
                >
                    История заказов
                </NavLink>
                <NavLink
                    className={location.pathname === "/" ? styleActive : styleInactive}
                    onClick={handleNavLinkClick}
                    to="/"
                >
                    Выход
                </NavLink>
                <p
                    className={`${style.description} text text_type_main-default mt-20`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Outlet />
        </div>
    );
}
