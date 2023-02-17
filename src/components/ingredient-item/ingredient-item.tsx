import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyles from "./ingredient-item.module.css";
import { FC } from "react";
import { TIngredient } from "../../types/types";

type TIngredientItem = {
  ingredient: TIngredient;
  count: number;
};

const IngredientItem: FC<TIngredientItem> = ({ ingredient, count }) => {
  return (
    <li className={ingredientItemStyles.item}>
      <img
        className={ingredientItemStyles.img}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      <p
        className={`${ingredientItemStyles.text} text text_type_main-default ml-4 mr-4`}
      >
        {ingredient?.name}
      </p>
      <p
        className={`${ingredientItemStyles.price} text text_type_digits-default`}
      >
        {count} x {ingredient?.price} <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};

export default IngredientItem;
