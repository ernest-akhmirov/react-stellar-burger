import style from "./style.module.css"
import ReadyOrderDetails from "../components/ReadyOrderDetails/ReadyOrderDetails";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../services/constants";
import {useAppDispatch} from "../utils/hooks";

export function ReadyOrderPage() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: `/all` });
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })};
    }, [dispatch]);
    return (
        <div className={style.readyOrder}>
            <ReadyOrderDetails/>
        </div>
    );
}
