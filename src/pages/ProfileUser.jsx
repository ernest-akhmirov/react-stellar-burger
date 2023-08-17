import { useEffect, useState } from "react";
import {
	Input,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./profileUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../services/actions/authActions";

export function ProfileUser() {
	const dispatch = useDispatch();

	const [form, setValue] = useState({
		name: "",
		password: "",
		email: "",
	});
	const user = useSelector((store) => store.authReducer.user);
	useEffect(() => {
		setValue(user);
	}, [user]);


	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	const handleReset = (e) => {
		setValue(user);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUser(form));
	}


	return (
		<form onSubmit={onSubmit}>
			<Input
				type={"text"}
				placeholder={"Имя"}
				icon={"EditIcon"}
				value={form.name}
				name={"name"}
				error={false}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mb-6"
				onChange={onChange}
				required
			/>
			<Input
				type={"email"}
				placeholder={"Логин"}
				icon={"EditIcon"}
				value={form.email}
				name={"email"}
				error={false}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mb-6"
				onChange={onChange}
				required
			/>
			<Input
				type={"password"}
				placeholder={"Пароль"}
				icon={"EditIcon"}
				value={form.password || ""}
				name={"password"}
				error={false}
				errorText={"Ошибка"}
				size={"default"}
				extraClass="mb-6"
				onChange={onChange}
			/>
			<div className={style.buttonWrapper}>
				<Button
					htmlType="button"
					type="secondary"
					size="medium"
					extraClass={style.button}
					onClick={handleReset}
				>
					Отмена
				</Button>
				<Button
					htmlType="submit"
					type="primary"
					size="medium"
					extraClass="ml-2"
				>
					Сохранить
				</Button>
			</div>
		</form>
	);
}
