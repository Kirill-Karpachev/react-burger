import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyle from "./ingredient.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { propTypesIngredient } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      payload: ingredient,
    });
  };

  const closeModal = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
    });
  };

  const selectIngredient = useSelector(
    (store) => store.ingredientDetails.ingredientDetails
  );

  return (
    <>
      <div className={ingredientStyle.item} onClick={openModal}>
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
      </div>

      {selectIngredient && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: propTypesIngredient.isRequired,
};

export default Ingredient;
