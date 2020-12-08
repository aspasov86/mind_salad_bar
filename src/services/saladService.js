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

export const updateSalad = async ({ id, ...data }) => {
  const res = await axios.put(`/salads/${id}`, data);
  return res.data;
};

export const deleteSalad = async (id) => {
  const res = await axios.delete(`/salads/${id}`);
  return res.data;
};
