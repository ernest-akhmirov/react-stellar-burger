import { useState, useEffect } from 'react';
import style from "./style.module.css";
import { Input, Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { login } from '../services/actions/authActions';

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState(() => ({ email: "", password: "" }));
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const isAuthorized = useSelector((store) => store.authReducer.isAuthorized);

    const loginUser = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    //
    useEffect(() => {
        if (isAuthorized) {
            navigate("/profile");
        }
    }, [isAuthorized, navigate]);

    //
    const registrationButtonClick = () => {
        navigate("/register");
    };

    const rememberPasswordClick = () => {
        navigate("/forgot-password");
    };

    const togglePasswordVisibility = () => {

        setShowPassword(!showPassword);
    };


    return (
        <form className={style.main}>
            <h2 className="text text_type_main-large">Вход</h2>
            <div className="mt-6">
                <Input
                    value={form.email}
                    type={"email"}
                    placeholder={"E-mail"}
                    name={"email"}
                    onChange={onChange}
                    autoComplete="email"
                />
            </div>
            <div className="mt-6">
                <Input
                    value={form.password}
                    type={!showPassword ? 'password' : 'text'}
                    placeholder={"Пароль"}
                    name={"password"}
                    icon="ShowIcon"
                    onChange={onChange}
                    onIconClick={togglePasswordVisibility}
                    autoComplete="current-password"
                />
            </div>
            <Button extraClass="mt-6"
                htmlType="button"
                type="primary"
                size="medium"
                onClick={loginUser}>
                Войти
            </Button>
            <div className={`mt-20 ${style.footer}`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вы новый пользователь?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={registrationButtonClick}
                >
                    Зарегистрироваться
                </Button>
            </div>
            <div className={style.footer}>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={rememberPasswordClick}
                >
                    Восстановить пароль
                </Button>
            </div>
        </form>
    );
}

