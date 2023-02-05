import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import constructorStyles from "./constructor.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import loading from "../../images/loadingBun.svg";

function Constructor() {
  const error = useSelector((store) => store.ingredients.ingredientsFailed);
  const { orderDetailsRequest } = useSelector((store) => store.orderDetails);
  return (
    <>
      {error ? (
        <p className={`${constructorStyles.error} text text_type_main-large`}>
          Ошибка загрузки данных.
        </p>
      ) : (
        <>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберите бургер
          </h1>
          <div className={constructorStyles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </div>
        </>
      )}

      {orderDetailsRequest && (
        <div className={constructorStyles.loading}>
          <img src={loading} alt="" />
        </div>
      )}
    </>
  );
}

export default Constructor;
