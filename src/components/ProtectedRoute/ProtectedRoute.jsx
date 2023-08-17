import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ onlyUnauthenticated = false, element }) => {
  const user = useSelector((store) => store.authReducer.user);
  const location = useLocation();

  if (onlyUnauthenticated && user) {

    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnauthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
};

export const OnlyAuthenticated = (props) => <Protected onlyUnauthenticated={false} {...props} />;
export const OnlyUnauthenticated = (props) => <Protected onlyUnauthenticated={true} {...props} />;
