import React from 'react';
import PropTypes from 'prop-types';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import CaloriesNumber from '../CaloriesNumber/CaloriesNumber';

const CheckListItem = ({
  checkboxDisabled, checked, onChange, image, name, tags, calories
}) => (
  <Segment>
    <Grid columns="equal">
      <Grid.Column width={1} textAlign="center" verticalAlign="middle">
        <Checkbox disabled={checkboxDisabled} checked={checked} onChange={onChange} />
      </Grid.Column>
      <Grid.Column width={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Image src={image} style={{ height: '4rem', width: '4rem' }} rounded />
      </Grid.Column>
      <Grid.Column>
        <Grid.Row>
          <Header>{name}</Header>
        </Grid.Row>
        <Grid.Row>
          {tags.map(tag => <Label key={tag}>{tag}</Label>)}
        </Grid.Row>
      </Grid.Column>
      <Grid.Column textAlign="right" verticalAlign="middle">
        <CaloriesNumber size="mini" num={calories} />
      </Grid.Column>
    </Grid>
  </Segment>
);

CheckListItem.propTypes = {
  checkboxDisabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  calories: PropTypes.number.isRequired
};

export default CheckListItem;
