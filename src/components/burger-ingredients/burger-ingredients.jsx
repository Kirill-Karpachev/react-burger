import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import IngredientColumn from "../ingredient-column/ingredient-column";
import { propTypesIngredient } from "../utils/types";
import PropTypes from "prop-types";
import burgerIngredientStyle from "./burger-ingredients.module.css";

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState("one");

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
        <IngredientColumn ingredients={ingredients} type="bun" title="Булки" />

        <IngredientColumn
          ingredients={ingredients}
          type="sauce"
          title="Соусы"
        />
        <IngredientColumn
          ingredients={ingredients}
          type="main"
          title="Начинки"
        />
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(propTypesIngredient).isRequired,
};

export default BurgerIngredients;
