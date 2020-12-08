import React from 'react';
import PropTypes from 'prop-types';
import styles from './TopBar.module.scss';

const TopBar = ({ left, right }) => (
  <div className={styles.topBar}>
    {left}
    {right}
  </div>
);

TopBar.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired
};

export default TopBar;
