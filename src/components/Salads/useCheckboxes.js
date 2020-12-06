import { useState, useEffect } from 'react';
import { find, remove } from 'lodash';

const getSaladIngredient = (id, ingredientsArray) => find(ingredientsArray, ['id', id]);

function useCheckboxes(existingIngredients, alreadySelectedIngredients) {
  const [saladIngredients, setSaladIngredients] = useState([]);

  useEffect(() => {
    if (alreadySelectedIngredients) {
      setSaladIngredients(alreadySelectedIngredients);
    }
  }, [alreadySelectedIngredients]);

  const checkIfSelected = id => !!getSaladIngredient(id, saladIngredients);
  const checkboxClickHandler = id => () => {
    const newSaladIngredients = [...saladIngredients.map(selectedIngredient => ({ ...selectedIngredient }))];
    const ingredient = getSaladIngredient(id, existingIngredients);
    if (checkIfSelected(id)) {
      remove(newSaladIngredients, selectedIngredient => selectedIngredient.id === id);
    } else {
      newSaladIngredients.push(ingredient);
    }
    setSaladIngredients(newSaladIngredients);
  };
  return [saladIngredients, checkIfSelected, checkboxClickHandler];
}

export default useCheckboxes;
