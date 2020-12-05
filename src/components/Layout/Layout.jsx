import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

const Layout = ({
  title, tools, bottomLeft, bottomRight, bottom
}) => (
  <Grid celled style={{ boxShadow: 'none' }}>
    <Grid.Row style={{ boxShadow: '0 0 0 0 #d4d4d5' }}>
      <Grid.Column
        width={11}
        style={{
          fontSize: '1.4rem',
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: 0
        }}
      >
        {title}
      </Grid.Column>
      <Grid.Column width={16} style={{ boxShadow: '0 0 0 0 #d4d4d5' }}>{tools}</Grid.Column>
    </Grid.Row>
    <Grid.Row style={{ height: '80vh' }}>
      {bottom ? (
        <Grid.Column>{bottom}</Grid.Column>
      ) : (
        <>
          <Grid.Column width={11} style={{ height: '100%', overflowY: 'scroll' }}>{bottomLeft}</Grid.Column>
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
