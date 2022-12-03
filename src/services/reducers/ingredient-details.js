import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from '../actions/ingredient-details'

const initialState = {
  ingredientDetails: null,
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
        ingredientDetails: null
      }
    }
    default: {
      return state;
    }
  }
}
