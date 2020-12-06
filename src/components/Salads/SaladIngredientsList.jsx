import React from 'react';
import PropTypes from 'prop-types';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';

const SaladIngredientsList = ({ activeSalad }) => (
  <List ordered>
    {activeSalad.ingredients.map(({
      id, name, calories, image, tags
    }) => (
      <List.Item key={id} style={{ display: 'flex', padding: '.8rem 0' }}>
        <Image avatar src={image} style={{ height: '3em', width: '3em' }} />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>
            {tags.map(tag => <Label key={tag} size="mini">{tag}</Label>)}
          </List.Description>
        </List.Content>
        <List.Content style={{ marginLeft: 'auto' }}>
          <Statistic size="mini">
            <Statistic.Value>
              {calories}
            </Statistic.Value>
            <Statistic.Label>Calories</Statistic.Label>
          </Statistic>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

SaladIngredientsList.propTypes = {
  activeSalad: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
};

export default SaladIngredientsList;
