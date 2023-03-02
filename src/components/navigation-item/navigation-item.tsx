import { NavLink } from "react-router-dom";
import navigationItemStyles from "./navigation-item.module.css";
import { FC } from "react";

type TNavigationItem = {
  icon: JSX.Element;
  text: string;
  path: { pathname: string };
  exact?: boolean;
};

const NavigationItem: FC<TNavigationItem> = ({ icon, text, path, exact }) => {
  return (
    <NavLink
      to={path}
      className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${navigationItemStyles.item}`}
      activeClassName={navigationItemStyles.active}
      exact={exact}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default NavigationItem;
