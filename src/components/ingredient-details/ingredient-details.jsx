import { propTypesIngredient } from "../utils/types";
import ingredientDetailStyles from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }) {
  return (
    <div className={`${ingredientDetailStyles.details} pt-10 pb-15`}>
      <h2
        className={`${ingredientDetailStyles.title} text text_type_main-large`}
      >
        Детали ингредиента
      </h2>
      <img
        className={ingredientDetailStyles.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</p>
      <ul
        className={`${ingredientDetailStyles.ingredients} text text_type_main-default text_color_inactive`}
      >
        <li className={ingredientDetailStyles.item}>
          <span>Калории, ккал</span>
          <span className="text text_type_digits-default">
            {ingredient.calories}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient.proteins}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient.fat}
          </span>
        </li>
        <li className={ingredientDetailStyles.item}>
          <span>Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}
IngredientDetails.propTypes = {
  ingredient: propTypesIngredient.isRequired,
};

export default IngredientDetails;
