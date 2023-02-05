import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import NavigationItem from "../navigation-item/navigation-item";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  const location = useLocation();
  const feedPath = useRouteMatch("/feed");
  const profilePath = useRouteMatch("/profile");

  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <div className={headerStyles.container}>
        <ul className={headerStyles.nav}>
          <li>
            <NavigationItem
              icon={
                <BurgerIcon
                  type={location.pathname === "/" ? "primary" : "secondary"}
                />
              }
              text="Конструктор"
              path={{ pathname: "/" }}
              exact
            />
          </li>
          <li>
            <NavigationItem
              icon={<ListIcon type={feedPath ? "primary" : "secondary"} />}
              text="Лента заказов"
              path={{ pathname: "/feed" }}
            />
          </li>
        </ul>
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className={headerStyles.right}>
          <NavigationItem
            icon={<ProfileIcon type={profilePath ? "primary" : "secondary"} />}
            text="Личный кабинет"
            path={{ pathname: "/profile" }}
          />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
