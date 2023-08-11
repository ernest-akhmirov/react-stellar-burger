import { useState } from 'react';
import style from "./style.module.css";
import { Input, Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/authActions';

export function RegistrationPage() {
    const navigate = useNavigate();
    const [form, setValue] = useState(() => ({ name: "", email: "", password: "" }));
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const signIn = () => {
        navigate("/login");
    };

    const registerUser = (e) => {
        e.preventDefault();
        dispatch(register(form));
    };

    const togglePasswordVisibility = () => {
        console.log("now you see me");
        setShowPassword(!showPassword);
    };


    return (
        <form className={style.main}>
            <h2 className="text text_type_main-large">Регистрация</h2>
            <div className="mt-6">
                <Input
                    value={form.name}
                    type={"text"}
                    placeholder={"Имя"}
                    name={"name"}
                    onChange={onChange}
                    autoComplete="name"
                />
            </div>
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
                onClick={registerUser}>
                Зарегистрироваться
            </Button>
            <div className={`mt-20 ${style.footer}`}>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
                </p>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="medium"
                    onClick={signIn}
                >
                    Войти
                </Button>
            </div>
        </form>
    );
}

