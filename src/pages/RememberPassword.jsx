import { useState } from 'react';
import style from "./style.module.css";
import { Input, Button, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate,  } from "react-router-dom";
import { useDispatch,  } from 'react-redux';
import { requestRememberPassword } from '../services/actions/authActions';


export function RememberPassword() {
    const navigate = useNavigate();
    const [form, setValue] = useState(() => ({ email: "", }));
    const dispatch = useDispatch();


    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const signIn = () => {
        navigate("/login");
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(requestRememberPassword(form.email));
        navigate("/reset-password")
    };


    return (
        <form className={style.main} onSubmit={onSubmit}>
            <h2 className="text text_type_main-large">Восстановление пароля</h2>
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
            <Button extraClass="mt-6"
                htmlType="submit"
                type="primary"
                size="medium"
            >
                Восстановить
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

