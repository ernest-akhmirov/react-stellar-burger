import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./AppHeader.module.css";


export default function AppHeader() {
    return(
        <header className={styles.header}>
            <div className={styles.header_container}>
                <div className={styles.menu}>
                    <a href="#" className={styles.link}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default ml-2">
                            Конструктор
                        </p>
                    </a>
                    <a href="#" className={styles.link}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive ml-2">
                            Лента заказов
                        </p>
                    </a>
                </div>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <a href="#" className={styles.link}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive ml-2">
                        Личный кабинет
                    </p>  
                </a>
            </div>
        </header>
    )
}