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