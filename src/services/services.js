import axios from 'axios';

export const getSalads = async () => {
  const res = await axios.get('/salads');
  return res.data;
};

export const deleteSalad = async (id) => {
  const res = await axios.delete(`/salads/${id}`);
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

export const deleteIngredient = async (id) => {
  const res = await axios.delete(`/ingredients/${id}`);
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

export const getSaladIngredients = async (saladId) => {
  const res = await axios.get(`/salads/${saladId}/ingredients`);
  return res.data;
};

export const addSaladIngredient = async ({ id: saladId, data }) => {
  const res = await axios.post(`/salads/${saladId}/ingredients`, data);
  return res.data;
};

export const removeSaladIngredient = async (saladId, ingredientId) => {
  const res = await axios.delete(`/salads/${saladId}/ingredients/${ingredientId}`);
  return res.data;
};

const getSequenceFetcher = () => {
  let index = 0;
  const bigRes = [];
  const fetchInSequence = async (fetchFn, dataArray, id) => {
    while (index < dataArray.length) {
      const res = await fetchFn({ id, data: dataArray[index] }); // eslint-disable-line no-await-in-loop
      if (res) {
        index++;
        bigRes.push(res);
        await fetchInSequence(fetchFn, dataArray, id); // eslint-disable-line no-await-in-loop
      }
    }
    return bigRes;
  };
  return fetchInSequence;
};

export const createSaladData = async ({ name, tags, ingredients }) => {
  const bigRes = [];
  const res = await createSalad({ name, tags });
  const fetchInSequence = getSequenceFetcher();
  const addRes = await fetchInSequence(addSaladIngredient, ingredients, res.id);
  bigRes.push(...addRes);
  return bigRes;
};

export const updateSaladData = async ({
  id, name, tags, ingredients
}, ingredientsForRemoval = []
) => {
  const bigRes = [];
  const res = await Promise.all([
    updateSalad(id, { name, tags }),
    ...ingredientsForRemoval.map(ingredientData => removeSaladIngredient(id, ingredientData.ingredientId))
  ]);
  bigRes.push(...res);
  const fetchInSequence = getSequenceFetcher();
  const addRes = await fetchInSequence(addSaladIngredient, ingredients, id);
  bigRes.push(...addRes);
  return bigRes;
};
