import React from 'react';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

const Layout = ({ topLeft, topRight, bottomLeft, BottomRight }) => (
  <Grid celled style={{ boxShadow: 'none' }}>
    <Grid.Row style={{ height: '8vh', boxShadow: '0 0 0 0 #d4d4d5' }}>
      <Grid.Column width={11}>topLeft</Grid.Column>
      <Grid.Column width={5}>topRight</Grid.Column>
    </Grid.Row>
    <Grid.Row style={{ height: '70vh' }}>
      <Grid.Column width={11}>bottomLeft</Grid.Column>
      <Grid.Column width={5}>BottomRight</Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Layout;
