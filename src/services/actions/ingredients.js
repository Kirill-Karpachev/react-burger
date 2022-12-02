import {
  getIngredients,
  postOrder
} from '../../utils/burger-api'
import {
  NORMA_API
} from '../../utils/const';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS';
export const ORDER_DETAILS_FAILED = 'ORDER_DETAILS_FAILED';

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS';

export const ADD_BUN_INGREDIENT = 'ADD_BUN_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const DELETE_ALL_INGREDIENTS = 'DELETE_ALL_INGREDIENTS';

export function getIngredientsData() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })

    getIngredients(NORMA_API)
      .then(ingredients => {
        if (ingredients && ingredients.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: ingredients.data,
          })
        }
      }).catch(e => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        })
      })
  }
}

export function getOrderDetails(ingredients, setOrderModal) {
  return function (dispatch) {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    postOrder(NORMA_API, ingredients)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res
          })

          setOrderModal(true);
        }
      }).catch(e => {
        dispatch({
          type: ORDER_DETAILS_FAILED,
        })
      })
  }
}
