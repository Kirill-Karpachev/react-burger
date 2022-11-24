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
  orderDetailsReducer
} from './order-details';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer
});
