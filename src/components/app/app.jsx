import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { data } from "../utils/data";
import appStyles from "./app.module.css";

class App extends React.Component {
  render() {
    return (
      <div className={appStyles.app}>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients data={data}/>
          <BurgerConstructor data={data}/>
        </main>
      </div>
    );
  }
}

export default App;
