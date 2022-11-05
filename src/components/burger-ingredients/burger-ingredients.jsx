import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { propTypesIngredient } from "../utils/types";
import PropTypes from "prop-types";
import burgerIngredientStyle from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState("one");
  const ingredientsTypes = [
    { type: "bun", title: "Булки", id: 1 },
    { type: "sauce", title: "Соусы", id: 2 },
    { type: "main", title: "Начинки", id: 3 },
  ];

  return (
    <section className={burgerIngredientStyle.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className="mb-10" style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинка
        </Tab>
      </div>
      <ul className={burgerIngredientStyle.container}>
        {ingredientsTypes.map((ingredientType) => (
          <article key={ingredientType.id}>
            <h3 className="text text_type_main-medium mb-6">
              {ingredientType.title}
            </h3>
            <li className={`${burgerIngredientStyle.column} mb-10`}>
              {ingredients
                .filter((ingredient) => ingredient.type === ingredientType.type)
                .map((ingredient) => (
                  <Ingredient ingredient={ingredient} key={ingredient._id} />
                ))}
            </li>
          </article>
        ))}
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesIngredient).isRequired,
};

export default BurgerIngredients;
