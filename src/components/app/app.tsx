import { FC, StrictMode, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import { useDispatch } from "../../utils/hooks";
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
  Feed,
  OrderInfo,
} from "../../pages/index";
import ProtectedRoute from "../protected-route/protected-route";
import { getUser } from "../../services/actions/user";
import Modal from "../modal/modal";
import { Location } from "history";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderModal from "../order-modal/order-modal";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ background: Location }>();
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
            <Route path="/feed" component={Feed} exact />
            <Route path="/feed/:id" children={<OrderInfo />} />
            <ProtectedRoute
              path="/profile/orders/:id"
              children={<OrderInfo />}
            />
            <ProtectedRoute
              onlyUnAuth
              path="/login"
              children={<Login />}
              exact
            />
            <ProtectedRoute
              onlyUnAuth
              path="/register"
              children={<Register />}
              exact
            />
            <ProtectedRoute
              onlyUnAuth
              path="/forgot-password"
              children={<ForgotPassword />}
              exact
            />
            <ProtectedRoute
              onlyUnAuth
              path="/reset-password"
              children={<ResetPassword />}
              exact
            />
            <ProtectedRoute path="/profile" children={<Profile />} />
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

      {background && (
        <Route
          path="/feed/:id"
          children={
            <Modal onClose={() => history.goBack()}>
              <OrderModal />
            </Modal>
          }
        />
      )}

      {background && (
        <Route
          path="/profile/orders/:id"
          children={
            <Modal onClose={() => history.goBack()}>
              <OrderModal />
            </Modal>
          }
        />
      )}
    </div>
  );
};

export default App;
