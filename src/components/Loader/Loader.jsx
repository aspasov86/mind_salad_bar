import React from 'react';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Spinner from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import styles from './Loader.module.scss';

const Loader = () => (
  <Dimmer active inverted>
    <Spinner size="large" className={styles.loader} />
  </Dimmer>
);

export default Loader;
