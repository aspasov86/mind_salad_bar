import axios from 'axios';

export const getSalads = async () => {
  const res = await axios.get('/salads');
  return res.data;
};

export const saveSalad = async (data) => {
  const res = await axios.post('/salads', data);
  return res.data;
};

export const getIngredients = async () => {
  const res = await axios.get('/ingredients');
  return res.data;
};

export const saveIngredient = async (data) => {
  const res = await axios.post('/ingredients', data);
  return res.data;
};

export const getSaladIngredients = async (saladId) => {
  const res = await axios.get(`/salads/${saladId}/ingredients`);
  return res.data;
};

export const addSaladIngredient = async (saladId, data) => {
  const res = await axios.post(`/salads/${saladId}/ingredients`, data);
  return res.data;
};

export const saveSaladData = async (saladId, { name, tags, ingredients }) => {
  const res = await Promise.all([
    saveSalad({ name, tags }),
    ...ingredients.map(ingredientData => addSaladIngredient(saladId, ingredientData))
  ]);
  return res;
};
