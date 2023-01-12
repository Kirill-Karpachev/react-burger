import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ onlyUnAuth, children, ...rest }) {
  const location = useLocation();

  const { isAuth } = useSelector((store) => store.user);

  if (onlyUnAuth && isAuth) {
    return (
      <Redirect to={location.state?.from || { from: { pathname: "/" } }} />
    );
  }

  if (!onlyUnAuth && !isAuth) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute;
