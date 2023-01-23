import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import burgerIngredientStyle from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const [current, setCurrent] = useState("bun");

  const [bunRef, inViewBun] = useInView({ threshold: 0 });
  const [sauceRef, inViewSauce] = useInView({ threshold: 0 });
  const [mainRef, inViewMain] = useInView({ threshold: 0 });

  const ingredientsTypes = [
    { type: "bun", title: "Булки", id: 1, ref: bunRef },
    { type: "sauce", title: "Соусы", id: 2, ref: sauceRef },
    { type: "main", title: "Начинки", id: 3, ref: mainRef },
  ];

  const changeTab = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  return (
    <section className={burgerIngredientStyle.section}>
      <div className="mb-10" style={{ display: "flex" }}>
        {ingredientsTypes.map((ingredientType) => (
          <Tab
            key={ingredientType.id}
            value={ingredientType.type}
            active={current === ingredientType.type}
            onClick={changeTab}
          >
            {ingredientType.title}
          </Tab>
        ))}
      </div>
      <ul className={burgerIngredientStyle.container}>
        {ingredientsTypes.map((ingredientType) => (
          <article key={ingredientType.id}>
            <h3
              id={ingredientType.type}
              className="text text_type_main-medium mb-6"
            >
              {ingredientType.title}
            </h3>
            <li
              ref={ingredientType.ref}
              className={`${burgerIngredientStyle.column} mb-10`}
            >
              {ingredients
                ?.filter(
                  (ingredient) => ingredient.type === ingredientType.type
                )
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

export default BurgerIngredients;
