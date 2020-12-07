import React from 'react';
import PropTypes from 'prop-types';
import IngredientsForm from './IngredientsForm';
import { getIngredientById } from '../../services/services';
import useFetching from '../../hooks/Fetching';

const EditIngredient = ({ match, ...props }) => {
  const [ingredient, loading] = useFetching(getIngredientById.bind(null, match.params.id));
  return (
    <IngredientsForm
      mode="edit"
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
