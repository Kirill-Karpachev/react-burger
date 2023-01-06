import { StrictMode, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import { useDispatch } from "react-redux";
import { getIngredientsData } from "../../services/actions/ingredients";
import Constructor from "../../pages/constructor/constructor";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import ProtectedRoute from "../protected-route/protected-route";
import Profile from "../../pages/profile/profile";
import { getUser } from "../../services/actions/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <Router>
        <StrictMode>
          <AppHeader />
          <main className={appStyles.main}>
            <Switch>
              <Route path="/" component={Constructor} exact />
              <Route path="/login" exact>
                <Login />
              </Route>
              <ProtectedRoute path="/profile" exact>
                <Profile />
              </ProtectedRoute>
              <Route path="/register" exact>
                <Register />
              </Route>
              <ProtectedRoute path="/forgot-password" exact>
                <ForgotPassword />
              </ProtectedRoute>
              <ProtectedRoute path="/reset-password" exact>
                <ResetPassword />
              </ProtectedRoute>
            </Switch>
          </main>
        </StrictMode>
      </Router>
    </div>
  );
}

export default App;
