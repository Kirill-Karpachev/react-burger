import React from "react";
import Ingredient from "../ingredient/ingredient";
import ingredientColumnStyles from "./ingredient-column.module.css";

class IngredientColumn extends React.Component {
  render() {
    return (
      <li>
        <h3 className="text text_type_main-medium mb-6">{this.props.title}</h3>
        <ul className={`${ingredientColumnStyles.column} mb-10`}>
          {this.props.data.map((item) => {
            if (item.type === this.props.type) {
              return (
                <Ingredient
                  image={item.image}
                  price={item.price}
                  name={item.name}
                  key={item._id}
                />
              );
            }
          })}
        </ul>
      </li>
    );
  }
}

export default IngredientColumn;
