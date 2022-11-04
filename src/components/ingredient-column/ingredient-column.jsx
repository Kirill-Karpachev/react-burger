import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import ingredientColumnStyles from "./ingredient-column.module.css";
import { propTypesData } from "../utils/types";

function IngredientColumn({ title, type, ingredients }) {
  return (
    <li>
      <h3 className="text text_type_main-medium mb-6">{title}</h3>
      <ul className={`${ingredientColumnStyles.column} mb-10`}>
        {ingredients.map((ingredient) => {
          if (ingredient.type === type) {
            return <Ingredient ingredient={ingredient} key={ingredient._id} />;
          }
        })}
      </ul>
    </li>
  );
}

IngredientColumn.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(propTypesData).isRequired,
};

export default IngredientColumn;
