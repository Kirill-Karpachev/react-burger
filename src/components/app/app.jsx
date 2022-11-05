import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../utils/burger-api";
import { NORMA_API } from "../utils/const";
import appStyles from "./app.module.css";

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getIngredients(NORMA_API)
      .then((ingredients) => {
        setIngredients(ingredients.data);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      {error ? (
        <p className={`${appStyles.error} text text_type_main-large`}>Ошибка загрузки данных.</p>
      ) : (
        <main className={appStyles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      )}
    </div>
  );
}

export default App;
