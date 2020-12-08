import React from 'react';
import PropTypes from 'prop-types';
import IngredientsForm from './IngredientsForm';
import { getIngredientById } from '../../services/ingredientService';
import useFetching from '../../hooks/Fetching';
import { EDIT } from '../../constants/constants';

const EditIngredient = ({ match, ...props }) => {
  const [ingredient, loading] = useFetching(getIngredientById.bind(null, match.params.id));
  return (
    <IngredientsForm
      mode={EDIT}
      loading={loading}
      data={ingredient}
      {...props}
    />
  );
};

EditIngredient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default EditIngredient;
