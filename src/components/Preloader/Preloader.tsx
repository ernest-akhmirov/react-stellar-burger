import styles from "./Preloader.module.css";

export default function Preloader() {
    return (
        <div className={styles.preloaderWrapper}>
            <span className={styles.preloader}></span>
        </div>
    );
}