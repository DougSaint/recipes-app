export function getIngredients(obj) {
  const ingredients = Object.keys(obj)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => obj[key])
    .filter((value) => value !== '' && value !== null);

  return ingredients;
}

export const isInArray = (item, arr) => arr.some((el) => el === item);
export const removeItem = (string, array) => array.filter((item) => item !== string);

export const addLocalStorage = (item, type, id, arr) => {
  const obj = {
    [type]: {
      [id]: { checkedIngredients: [...arr, item] },
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

export const removeLocalStorage = (item, type, id, arr) => {
  const obj = {
    [type]: {
      [id]: { checkedIngredients: arr.filter((el) => el !== item) },
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};
