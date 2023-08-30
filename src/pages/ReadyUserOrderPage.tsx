import style from "./style.module.css"
import ReadyOrderDetails from "../components/ReadyOrderDetails/ReadyOrderDetails";
import {useAppDispatch} from "../utils/hooks";
import {useEffect} from "react";
import {WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START} from "../services/constants";

export function ReadyUserOrderPage() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const cleanedToken = token?.replace("Bearer ", "");
        dispatch({type: WS_AUTH_CONNECTION_START, payload: `?token=${cleanedToken}`});
        return () => {dispatch({ type: WS_AUTH_CONNECTION_CLOSED })};
    }, [dispatch]);

    return (
        <div className={style.readyOrder}>
            <ReadyOrderDetails/>
        </div>
    );
}
