import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from "./app.module.css";

function App() {
  const linkIngredients = "https://norma.nomoreparties.space/api/ingredients";
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    fetch(linkIngredients)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((ingredients) => {
        setIngredients(ingredients.data);
      })
      .catch((err) => console.log(`Ошибка загрузки данных - ${err}`));
  }, []);

  return (
    <div className={appStyles.app}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
