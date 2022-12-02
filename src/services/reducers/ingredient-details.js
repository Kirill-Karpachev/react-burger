import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from '../actions/ingredients'

const initialState = {
  ingredientDetails: false,
}

export const ingredientsDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: action.payload,
      }
    }
    case REMOVE_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: false
      }
    }
    default: {
      return state;
    }
  }
}
