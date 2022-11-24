import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsData } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const error = useSelector((store) => store.ingredients.ingredientsFailed);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {error ? (
        <p className={`${appStyles.error} text text_type_main-large`}>
          Ошибка загрузки данных.
        </p>
      ) : (
        <main className={appStyles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
}

export default App;
