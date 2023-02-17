import { TIngredient } from "../../types/types";
import { TIngredientConstructorActions } from "../actions/ingredient-constructor";
import {
  ADD_BUN_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_ALL_INGREDIENTS,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../actions/ingredient-constructor";
import update from "immutability-helper";

type TIngredientsConstructorState = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient>;
};

const initialState: TIngredientsConstructorState = {
  bun: null,
  ingredients: [],
};

export const ingredientsConstructorReducer = (
  state = initialState,
  action: TIngredientConstructorActions
): TIngredientsConstructorState => {
  switch (action.type) {
    case ADD_BUN_INGREDIENT: {
      return {
        ...state,
        bun: action.payload,
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (ingredient) => ingredient?.id !== action.payload
        ),
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: update(state.ingredients, {
          $splice: [
            [action.payload.dragIndex, 1],
            [
              action.payload.hoverIndex,
              0,
              state.ingredients[action.payload.dragIndex],
            ],
          ],
        }),
      };
    }
    case DELETE_ALL_INGREDIENTS: {
      return {
        bun: null,
        ingredients: [],
      };
    }
    default: {
      return state;
    }
  }
};
