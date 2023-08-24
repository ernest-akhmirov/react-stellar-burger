import style from "./style.module.css"
import ReadyOrderDetails from "../components/ReadyOrderDetails/ReadyOrderDetails";

export function ReadyOrderPage() {
    return (
        <div className={style.readyOrder}>
            <ReadyOrderDetails/>
        </div>
    );
}
