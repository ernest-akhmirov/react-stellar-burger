import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

export default function AppHeader() {
    const location = useLocation();

    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <nav className={styles.menu}>
                    <NavLink
                        to="/"
                        className={styles.link}
                    >
                        <BurgerIcon
                            type={location.pathname === '/' ? 'primary' : 'secondary'}
                        />
                        <p
                            className={`text text_type_main-default ${location.pathname === '/' ? '' : 'text_color_inactive'
                            } ml-2`}
                        >
                            Конструктор
                        </p>
                    </NavLink>
                    <NavLink
                        to="/feed"
                        className={styles.link}
                    >
                        <ListIcon
                            type={location.pathname === '/feed' ? 'primary' : 'secondary'}
                        />
                        <p
                            className={`text text_type_main-default ${location.pathname === '/feed' ? '' : 'text_color_inactive'
                            } ml-2`}
                        >
                            Лента заказов
                        </p>
                    </NavLink>
                </nav>
                <div className={styles.logo}>
                    <NavLink
                        to="/"
                    >
                        <Logo/>
                    </NavLink>
                </div>
                <NavLink
                    to="/profile"
                    className={styles.link}
                >
                    <ProfileIcon
                        type={location.pathname === '/login' ? 'primary' : 'secondary'}
                    />
                    <p
                        className={`text text_type_main-default ${location.pathname === '/login' ? '' : 'text_color_inactive'
                        } ml-2`}
                    >
                        Личный кабинет
                    </p>
                </NavLink>
            </div>
        </header>
    );
}
