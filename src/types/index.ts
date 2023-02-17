import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from "redux";

import { store } from "../services/store";
import { TIngredientConstructorActions } from "../services/actions/ingredient-constructor";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TLoginActions } from "../services/actions/login";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TResetPasswordActions } from "../services/actions/reset-password";
import { TUserActions } from "../services/actions/user";
import { TWsActions } from "../services/actions/ws-actions";
import { TWsUserActions } from "../services/actions/ws-user-actions";
import { TRegisterActions } from "../services/actions/register";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TIngredientConstructorActions
  | TIngredientsActions
  | TLoginActions
  | TOrderDetailsActions
  | TResetPasswordActions
  | TUserActions
  | TWsActions
  | TWsUserActions
  | TRegisterActions;

export type AppThunk<Return = void> = ActionCreator<
  ThunkAction<Return, Action, RootState, TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
