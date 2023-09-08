import {Navigate, useLocation} from "react-router-dom";
import React, {FC, ReactElement} from "react";
import {useAppSelector} from "../../utils/hooks";



type TProtectedProps = {
    onlyUnauthenticated?: boolean;
    element: ReactElement;
};
const Protected: FC<TProtectedProps> = ({onlyUnauthenticated = false, element}) => {
    const user = useAppSelector((store) => store.authReducer.user);
    const location = useLocation();

    if (onlyUnauthenticated && user) {

        const {from} = location.state || {from: {pathname: "/"}};
        return <Navigate to={from}/>;
    }

    if (!onlyUnauthenticated && !user) {
        return <Navigate to="/login" state={{from: location}}/>;
    }
    return element;
};

export const OnlyAuthenticated: React.FC<TProtectedProps> = (props) => <Protected
    onlyUnauthenticated={false} {...props} />;
export const OnlyUnauthenticated: React.FC<TProtectedProps> = (props) => <Protected
    onlyUnauthenticated={true} {...props} />;
