import { FC } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Location } from "history";
import { useSelector } from "../../utils/hooks";

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
  path: string;
  exact?: boolean;
};

const ProtectedRoute: FC<TProtectedRoute> = ({
  onlyUnAuth,
  children,
  ...rest
}) => {
  const location = useLocation<{ from: Location }>();

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
};

export default ProtectedRoute;
