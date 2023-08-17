import React, { useState } from 'react';
import style from "./style.module.css";
import { Input, Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate} from "react-router-dom";
import {useDispatch, useSelector,} from 'react-redux';
import { requestResetPassword } from '../services/actions/authActions';


export function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setValue] = useState(() => ({  password: "", code: "" }));
    const [showPassword, setShowPassword] = useState(false);
    const isRememberVisited = useSelector((state: any) => state.authReducer.isPasswordResetPending);

    if (!isRememberVisited) {
        return <Navigate to="/forgot-password" replace={true} />;
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

      const signIn = () => {
        navigate("/login");
    };
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>):void =>{
        console.log('установлен новый пароль')
        e.preventDefault();
        dispatch(requestResetPassword(form.password, form.code));
        navigate("/login");
        };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form className={style.main} onSubmit={onSubmit}>
            <h2 className="text text_type_main-large">Восстановление пароля</h2>
            <div className="mt-6">
                <Input
                    value={form.password}
                    type={!showPassword ? 'password' : 'text'}
                    placeholder={"Введите новый пароль"}
                    name={"password"}
                    icon="ShowIcon"
                    onChange={onChange}
                    onIconClick={togglePasswordVisibility}
                    autoComplete="current-password"
                    required
                />
            </div>
            <div className="mt-6">
                <Input
                    value={form.code}
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    name={"code"}
                    onChange={onChange}
                    autoComplete="code"
                    required
                />
            </div>
            <Button extraClass="mt-6"
                    htmlType="submit"
                    type="primary" 
                    size="medium"
            >
                Сохранить
            </Button>
            <div className={`mt-20 ${style.footer}`}>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?
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

