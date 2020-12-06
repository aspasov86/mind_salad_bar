import axios from 'axios';

export const getSalads = async () => {
  const res = await axios.get('/salads');
  return res.data;
};

export const getSaladById = async (id) => {
  const res = await axios.get(`/salads/${id}`);
  return res.data;
};

export const createSalad = async (data) => {
  const res = await axios.post('/salads', data);
  return res.data;
};

export const updateSalad = async (id, data) => {
  const res = await axios.put(`/salads/${id}`, data);
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

export const removeSaladIngredient = async (saladId, ingredientId) => {
  const res = await axios.delete(`/salads/${saladId}/ingredients/${ingredientId}`);
  return res.data;
};

export const createSaladData = async ({ name, tags, ingredients }) => {
  const salad = await createSalad({ name, tags });
  const res = await Promise.all([...ingredients.map(ingredientData => addSaladIngredient(salad.id, ingredientData))]);
  return res;
};

export const updateSaladData = async ({
  id, name, tags, ingredients
}, ingredientsForRemoval = []
) => {
  const res = await Promise.all([
    updateSalad(id, { name, tags }),
    ...ingredients.map(ingredientData => addSaladIngredient(id, ingredientData)),
    ...ingredientsForRemoval.map(ingredientData => addSaladIngredient(id, ingredientData.id))
  ]);
  return res;
};
