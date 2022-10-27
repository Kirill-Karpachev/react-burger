import React from "react";
import navigationItemStyles from "./navigation-item.module.css";

class NavigationItem extends React.Component {
  render() {
    return (
      <a
        href="/"
        className={`text text_type_main-default text_color_inactive pt-4 pb-4 pl-5 pr-5 ${
          this.props.active ? navigationItemStyles.active : ""
        } ${navigationItemStyles.item}`}
      >
        {this.props.icon}
        <p>{this.props.text}</p>
      </a>
    );
  }
}

export default NavigationItem;
