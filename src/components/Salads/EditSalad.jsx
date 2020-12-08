import React from 'react';
import PropTypes from 'prop-types';
import SaladForm from './SaladForm';
import { getSaladById } from '../../services/saladService';
import useFetching from '../../hooks/Fetching';

const EditSalad = ({ match, ...props }) => {
  const [salad, loading] = useFetching(getSaladById.bind(null, match.params.id));
  return <SaladForm mode="edit" loading={loading} data={salad} {...props} />;
};

EditSalad.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default EditSalad;
