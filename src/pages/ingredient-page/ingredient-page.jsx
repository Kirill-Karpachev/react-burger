import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ingredientPageStyles from "./ingredient-page.module.css";

function IngredientPage() {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const ingredient = ingredients?.find((ingredient) => ingredient._id === id);

  return (
    <div className={`${ingredientPageStyles.details} pt-10 pb-15`}>
      <img
        className={ingredientPageStyles.image}
        src={ingredient?.image}
        alt={ingredient?.name}
      />
      <p className="text text_type_main-medium mt-4 mb-8">{ingredient?.name}</p>
      <ul
        className={`${ingredientPageStyles.ingredients} text text_type_main-default text_color_inactive`}
      >
        <li className={ingredientPageStyles.item}>
          <span>Калории, ккал</span>
          <span className="text text_type_digits-default">
            {ingredient?.calories}
          </span>
        </li>
        <li className={ingredientPageStyles.item}>
          <span>Белки, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.proteins}
          </span>
        </li>
        <li className={ingredientPageStyles.item}>
          <span>Жиры, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.fat}
          </span>
        </li>
        <li className={ingredientPageStyles.item}>
          <span>Углеводы, г</span>
          <span className="text text_type_digits-default">
            {ingredient?.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default IngredientPage;
