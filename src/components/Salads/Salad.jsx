import React from 'react';
import PropTypes from 'prop-types';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import styles from './Salad.module.scss';

const Salad = ({
  onClick, className, onMouseEnter, onMouseLeave, image, name, ingredients, tags, hovered, onEdit
}) => (
  <Item
    onClick={onClick}
    className={className}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Item.Image src={image} style={{ width: '9rem' }} />
    <Item.Content>
      <Item.Header>{name}</Item.Header>
      <Item.Description>
        {ingredients.length
          ? `Ingredients: ${ingredients.map((ingredient => ingredient.name)).join(', ')}`
          : 'No ingredients'}
      </Item.Description>
      <Item.Extra>
        <Statistic floated="right">
          <Statistic.Value>
            {ingredients.reduce((ttl, curr) => ttl + curr.calories, 0)}
          </Statistic.Value>
          <Statistic.Label>Calories</Statistic.Label>
        </Statistic>
        {tags.map(tag => <Label key={tag}>{tag}</Label>)}
      </Item.Extra>
    </Item.Content>
    {hovered && (
    <div className={styles.icons}>
      <Icon name="pencil" size="large" onClick={onEdit} />
      <Icon name="trash alternate" size="large" style={{ color: '#d11a2a' }} />
    </div>
    )}
  </Item>
);

Salad.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  hovered: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default Salad;
