import { StrictMode, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/ingredients";
import Constructor from "../../pages/constructor/constructor";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  NotFound,
  IngredientPage,
} from "../../pages/index";
import ProtectedRoute from "../protected-route/protected-route";
import { getUser } from "../../services/actions/user";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsData());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <StrictMode>
        <AppHeader />
        <main className={appStyles.main}>
          <Switch location={background || location}>
            <Route path="/" component={Constructor} exact />
            <ProtectedRoute onlyUnAuth path="/login" exact>
              <Login />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth path="/register" exact>
              <Register />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth path="/forgot-password" exact>
              <ForgotPassword />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth path="/reset-password" exact>
              <ResetPassword />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <Route path="/ingredient/:id" children={<IngredientPage />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </main>
      </StrictMode>

      {background && (
        <Route
          path="/ingredient/:id"
          children={
            <Modal onClose={() => history.goBack()}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </div>
  );
}

export default App;
