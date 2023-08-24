import {useState, useEffect, FormEvent, ChangeEvent,} from 'react';
import style from "./style.module.css";
import {Input, Button,} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate,} from "react-router-dom";
import {login} from '../services/actions/authActions';
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {RootState} from "../utils/types";

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [form, setValue] = useState(() => ({email: "", password: "", name: ""}));
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const isAuthorized = useAppSelector((store: RootState) => store.authReducer.isAuthorized);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
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
        <>
            <form className={style.main} onSubmit={onSubmit}>
                <h2 className="text text_type_main-large">Вход</h2>
                <div className="mt-6">
                    <Input
                        value={form.email}
                        type={"email"}
                        placeholder={"E-mail"}
                        name={"email"}
                        onChange={onChange}
                        autoComplete="email"
                        required
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
                        required
                    />
                </div>
                <Button extraClass="mt-6"
                        htmlType="submit"
                        type="primary"
                        size="medium"
                >
                    Войти
                </Button>
            </form>
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
        </>
    );
}

