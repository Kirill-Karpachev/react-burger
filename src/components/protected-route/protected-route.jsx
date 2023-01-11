import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ onlyUnAuth, children, ...rest }) {
  const { isAuth } = useSelector((store) => store.user);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    return <Redirect to={{ from: { pathname: "/" } }} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute;
