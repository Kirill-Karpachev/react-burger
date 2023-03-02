import { useCallback } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import { signOut } from "../../services/actions/user";
import { getCookie } from "../../utils/util";
import { ProfileData, ProfileOrders } from "../index";
import profileStyles from "./profile.module.css";
import { FC } from "react";
import { useDispatch } from "../../utils/hooks";

const Profile: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    dispatch(
      signOut({ token: getCookie("refreshToken") }, () =>
        history.replace({ pathname: "/login" })
      )
    );
  }, [history, dispatch]);

  return (
    <div className={profileStyles.content}>
      <div className={profileStyles.menu}>
        <ul className={`${profileStyles.nav} mb-20`}>
          <li className={profileStyles.item}>
            <NavLink
              exact
              className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
              to="/profile"
              activeClassName={profileStyles.active}
            >
              Профиль
            </NavLink>
          </li>
          <li className={profileStyles.item}>
            <NavLink
              exact
              className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
              to="/profile/orders"
              activeClassName={profileStyles.active}
            >
              История заказов
            </NavLink>
          </li>
          <li className={profileStyles.item}>
            <button
              onClick={logout}
              className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </button>
          </li>
        </ul>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={profileStyles.main}>
        <Switch>
          <Route path="/profile" component={ProfileData} exact />
          <Route path="/profile/orders" component={ProfileOrders} exact />
        </Switch>
      </div>
    </div>
  );
};

export default Profile;
