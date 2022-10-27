import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyle from "./ingredient.module.css";

class Ingredient extends React.Component {
  render() {
    return (
      <li className={ingredientStyle.item}>
        <img src={this.props.image} alt="" />
        <Counter count={1} size="default" />
        <div className={`${ingredientStyle.price} mt-2 mb-2`}>
          <p
            className={`${ingredientStyle.text} text text_type_digits-default`}
          >
            {this.props.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${ingredientStyle.text} text text_type_main-default`}>
          {this.props.name}
        </p>
      </li>
    );
  }
}

export default Ingredient;
