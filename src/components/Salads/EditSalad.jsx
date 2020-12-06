import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SaladForm from './SaladForm';
import { getSaladById } from '../../services/services';

const EditSalad = ({ match, ...props }) => {
  const [salad, setSalad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSaladById(match.params.id)
      .then((res) => {
        setSalad(res);
        setLoading(false);
      });
  }, []);

  return <SaladForm mode="edit" loading={loading} data={salad} {...props} />;
};

EditSalad.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default EditSalad;
