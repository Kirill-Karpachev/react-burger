import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import navigationItemStyles from "./navigation-item.module.css";

function NavigationItem({ icon, text, path }) {
  return (
    <NavLink
      exact
      to={path}
      className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${navigationItemStyles.item}`}
      activeClassName={navigationItemStyles.active}
    >
      {icon}
      {text}
    </NavLink>
  );
}

NavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.object.isRequired,
};

export default NavigationItem;
