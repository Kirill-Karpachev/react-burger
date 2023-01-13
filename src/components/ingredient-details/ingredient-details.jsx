import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ingredientDetailStyles from "./ingredient-details.module.css";

function IngredientDetails() {
  const history = useHistory();

  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredient = ingredients?.find((ingredient) => ingredient._id === id);

  const clearHistory = (e) => {
    e.preventDefault();
    history.replace({ state: {} });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", clearHistory);
    return () => {
      window.removeEventListener("beforeunload", clearHistory);
    };
  }, []);

  return (
    <div className={`${ingredientDetailStyles.details} pt-10 pb-15`}>
      <h2
        className={`${ingredientDetailStyles.title} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={ingredientDetailStyles.image}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient?.name}</p>
      <ul
        className={`${ingredientDetailStyles.ingredients} text text_type_main-default text_color_inactive`}
      >
        <li className={ingredientDetailStyles.item}>
          <span>Калории, ккал</span>
          <span className="text text_type_digits-default">
            {ingredient?.calories}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.proteins}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.fat}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
