import { useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyle from "./ingredient.module.css";
import { propTypesIngredient } from "../../utils/types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

function Ingredient({ ingredient }) {
  const location = useLocation();
  const ingredientsConstructorState = useSelector(
    (store) => store.ingredientsConstructor
  );

  const count = useMemo(() => {
    return ingredient.type === "bun" &&
      ingredient._id === ingredientsConstructorState.bun?._id
      ? 2
      : ingredientsConstructorState.ingredients.filter(
          (item) => item._id === ingredient._id
        ).length;
  }, [ingredient, ingredientsConstructorState]);

  const [{ opacity }, ref] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      to={{
        pathname: `/ingredient/${ingredient._id}`,
        state: { background: location },
      }}
      ref={ref}
      className={ingredientStyle.item}
      style={{ opacity }}
    >
      <img src={ingredient.image} alt={ingredient.name} />
      <Counter count={count} size="default" />
      <div className={`${ingredientStyle.price} mt-2 mb-2`}>
        <p className={`${ingredientStyle.text} text text_type_digits-default`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientStyle.text} text text_type_main-default`}>
        {ingredient.name}
      </p>
    </Link>
  );
}

Ingredient.propTypes = {
  ingredient: propTypesIngredient.isRequired,
};

export default Ingredient;
