import PropTypes from "prop-types";
import navigationItemStyles from "./navigation-item.module.css";

function NavigationItem({ icon, text, active }) {
  return (
    <a
      href="/"
      className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${
        active ? navigationItemStyles.active : ""
      } ${navigationItemStyles.item}`}
    >
      {icon}
      <p>{text}</p>
    </a>
  );
}

NavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default NavigationItem;
