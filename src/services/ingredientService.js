import axios from 'axios';

export const getIngredients = async () => {
  const res = await axios.get('/ingredients');
  return res.data;
};

export const getIngredientById = async (id) => {
  const res = await axios.get(`/ingredients/${id}`);
  return res.data;
};

export const createIngredient = async (data) => {
  const res = await axios.post('/ingredients', data);
  return res.data;
};

export const updateIngredient = async (id, data) => {
  const res = await axios.put(`/ingredients/${id}`, data);
  return res.data;
};

export const deleteIngredient = async (id) => {
  const res = await axios.delete(`/ingredients/${id}`);
  return res.data;
};
