import { TIngredient } from "../../types/types";

export const ADD_BUN_INGREDIENT: "ADD_BUN_INGREDIENT" = "ADD_BUN_INGREDIENT";
export const ADD_INGREDIENTS: "ADD_INGREDIENTS" = "ADD_INGREDIENTS";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const DELETE_ALL_INGREDIENTS: "DELETE_ALL_INGREDIENTS" =
  "DELETE_ALL_INGREDIENTS";

export interface IAddBunIngredientAction {
  readonly type: typeof ADD_BUN_INGREDIENT;
  readonly payload: TIngredient;
}

export interface IAddIngredientsAction {
  readonly type: typeof ADD_INGREDIENTS;
  readonly payload: TIngredient;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: { dragIndex: number; hoverIndex: number };
}

export interface IDeleteAllIngredientsAction {
  readonly type: typeof DELETE_ALL_INGREDIENTS;
}

export type TIngredientConstructorActions =
  | IAddBunIngredientAction
  | IAddIngredientsAction
  | IDeleteIngredientAction
  | IMoveIngredientAction
  | IDeleteAllIngredientsAction;
