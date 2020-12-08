import React from 'react';
import PropTypes from 'prop-types';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import CaloriesNumber from '../CaloriesNumber/CaloriesNumber';
import styles from './SaladIngredientsList.module.scss';

const SaladIngredientsList = ({ activeSalad }) => (
  <List ordered>
    {activeSalad.ingredients.map(({
      ingredientId, name, calories, image, tags
    }) => (
      <List.Item key={ingredientId} className={styles.item}>
        <Image avatar src={image} />
        <List.Content>
          <List.Header>{name}</List.Header>
          <List.Description>
            {tags.map(tag => <Label key={tag} size="mini">{tag}</Label>)}
          </List.Description>
        </List.Content>
        <List.Content>
          <CaloriesNumber num={calories} size="mini" />
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
