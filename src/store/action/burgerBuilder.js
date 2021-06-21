import * as actionType from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = (name) => {
  return {
    type: actionType.ADD_INGREDIENT,
    ingredientName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionType.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ings) => {
  return {
    type: actionType.SET_INGREDIENT,
    ingredients: ings,
  };
};
export const fetchIngredientFailed = () => {
  return {
    type: actionType.FETCH_INGREDIENT_FAILED,
  };
};
export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get(
        "https://react-my-burger-f8f42-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        dispatch(setIngredient(response.data))
      })
      .catch((error) => {
        dispatch(fetchIngredientFailed())
      });
  };
};
