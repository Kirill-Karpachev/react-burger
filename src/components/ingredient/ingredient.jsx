import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyle from "./ingredient.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { propTypesIngredient } from "../utils/types";

function Ingredient({ ingredient }) {
  const [ingredientDetail, setIngredientDetail] = React.useState(false);

  return (
    <>
      <li
        className={ingredientStyle.item}
        onClick={() => setIngredientDetail(true)}
      >
        <img src={ingredient.image} alt="" />
        <Counter count={1} size="default" />
        <div className={`${ingredientStyle.price} mt-2 mb-2`}>
          <p
            className={`${ingredientStyle.text} text text_type_digits-default`}
          >
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${ingredientStyle.text} text text_type_main-default`}>
          {ingredient.name}
        </p>
      </li>

      {ingredientDetail && (
        <Modal onClose={() => setIngredientDetail(false)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: propTypesIngredient.isRequired,
};

export default Ingredient;
