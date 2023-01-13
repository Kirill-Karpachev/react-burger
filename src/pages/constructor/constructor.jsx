import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import constructorStyles from "./constructor.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";

function Constructor() {
  const error = useSelector((store) => store.ingredients.ingredientsFailed);

  return (
    <>
      {error ? (
        <p className={`${constructorStyles.error} text text_type_main-large`}>
          Ошибка загрузки данных.
        </p>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  );
}

export default Constructor;
