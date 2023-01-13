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
  loginReducer
} from './login';
import {
  orderDetailsReducer
} from './order-details';
import {
  resetPasswordReducer
} from './reset-password';
import {
  userReducer
} from './user';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientsDetailsReducer,
  orderDetails: orderDetailsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  login: loginReducer,
  user: userReducer,
  resetPassword: resetPasswordReducer,
});
