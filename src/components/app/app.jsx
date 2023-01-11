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
import { getUser, updateToken } from "../../services/actions/user";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getCookie } from "../../utils/util";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsData());
    if (getCookie("time") <= Date.now()) {
      dispatch(updateToken());
      dispatch(getUser());
    } else {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <StrictMode>
        <AppHeader />
        <main className={appStyles.main}>
          <Switch location={background || location}>
            <Route path="/" component={Constructor} exact />
            <ProtectedRoute onlyUnAuth={true} path="/login" exact>
              <Login />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={false} path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/register" exact>
              <Register />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
              <ForgotPassword />
            </ProtectedRoute>
            <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
              <ResetPassword />
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
