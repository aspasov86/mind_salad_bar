import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import styles from './Layout.module.scss';

const Layout = ({
  title, tools, bottomLeft, bottomRight, bottom
}) => (
  <Grid celled className={styles.grid}>
    <Grid.Row className={styles.firstRow}>
      <Grid.Column width={11} className={styles.topFirstColumn}>
        {title}
      </Grid.Column>
      <Grid.Column width={16} className={styles.topSecondColumn}>{tools}</Grid.Column>
    </Grid.Row>
    <Grid.Row className={styles.secondRow}>
      {bottom ? (
        <Grid.Column>{bottom}</Grid.Column>
      ) : (
        <>
          <Grid.Column width={11} className={styles.bottomLeftColumn}>{bottomLeft}</Grid.Column>
          <Grid.Column width={5}>{bottomRight}</Grid.Column>
        </>
      )}
    </Grid.Row>
  </Grid>
);

Layout.defaultProps = {
  bottomLeft: null,
  bottomRight: null,
  bottom: null,
  tools: null
};

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  bottomLeft: PropTypes.element,
  bottomRight: PropTypes.element,
  tools: PropTypes.element,
  bottom: PropTypes.element
};

export default Layout;
