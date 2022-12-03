import { useMemo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyle from "./ingredient.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { propTypesIngredient } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
} from "../../services/actions/ingredient-details";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
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

  const [{ opacity }, ref] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <div
        ref={ref}
        className={ingredientStyle.item}
        onClick={openModal}
        style={{ opacity }}
      >
        <img src={ingredient.image} alt={ingredient.name} />
        <Counter count={count} size="default" />
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
