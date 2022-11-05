import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavigationItem from "../navigation-item/navigation-item";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={`${headerStyles.header} pt-4 pb-4`}>
      <div className={headerStyles.container}>
        <ul className={headerStyles.nav}>
          <li>
            <NavigationItem
              icon={<BurgerIcon type="primary" />}
              text="Конструктор"
              active
            />
          </li>
          <li>
            <NavigationItem
              icon={<ListIcon type="secondary" />}
              text="Лента заказов"
            />
          </li>
        </ul>
        <Logo />
        <div className={headerStyles.right}>
          <NavigationItem
            icon={<ProfileIcon type="secondary" />}
            text="Личный кабинет"
          />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
