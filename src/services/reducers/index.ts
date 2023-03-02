import { combineReducers } from "redux";
import { feedReducer } from "./feed";
import { ingredientsReducer } from "./ingredients";
import { ingredientsConstructorReducer } from "./ingredients-constructor";
import { loginReducer } from "./login";
import { orderDetailsReducer } from "./order-details";
import { profileOrdersReducer } from "./profile-orders";
import { resetPasswordReducer } from "./reset-password";
import { userReducer } from "./user";
import { registerReducer } from "./register";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orderDetails: orderDetailsReducer,
  ingredientsConstructor: ingredientsConstructorReducer,
  login: loginReducer,
  user: userReducer,
  resetPassword: resetPasswordReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  register: registerReducer,
});
