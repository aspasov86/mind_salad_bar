import React from 'react';
import PropTypes from 'prop-types';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';

const CaloriesNumber = ({ num, ...props }) => (
  <Statistic {...props}>
    <Statistic.Value>
      {num}
    </Statistic.Value>
    <Statistic.Label>Calories</Statistic.Label>
  </Statistic>
);

CaloriesNumber.propTypes = {
  num: PropTypes.number.isRequired
};

export default CaloriesNumber;
