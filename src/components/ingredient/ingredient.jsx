import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientStyle from "./ingredient.module.css";

function Ingredient({ image, name, price }) {
  return (
    <li className={ingredientStyle.item}>
      <img src={image} alt="" />
      <Counter count={1} size="default" />
      <div className={`${ingredientStyle.price} mt-2 mb-2`}>
        <p className={`${ingredientStyle.text} text text_type_digits-default`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyle.text} text text_type_main-default`}>
        {name}
      </p>
    </li>
  );
}

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Ingredient;
