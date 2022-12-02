import {
  combineReducers
} from 'redux';
import {
  ingredientsDetailsReducer
} from './ingredient-details';
import {
  ingredientsReducer
} from './ingredients';
import {
  ingredientsConstructorReducer
} from './ingredients-constructor';
import {
  orderDetailsReducer
} from './order-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
  ingredientsConstructor: ingredientsConstructorReducer
});
