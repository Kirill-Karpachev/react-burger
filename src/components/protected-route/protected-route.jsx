import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const user = useSelector((store) => store.user.user);
  const { isAuth } = useSelector((store) => store.login);

  const location = useLocation();

  if (
    location.pathname === "/reset-password" ||
    location.pathname === "/forgot-password"
  ) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user.email && user.name ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.email && user.name) || isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
