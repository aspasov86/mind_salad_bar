import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { getIngredients, deleteIngredient } from '../../services/services';
import Layout from '../Layout/Layout';
import ListItem from '../ListItem/ListItem';
import ToolsBar from '../ToolsBar/ToolsBar';
import ingredientsFilter from './ingredientsFilter';
import useFetching from '../../hooks/Fetching';
import Loader from '../Loader/Loader';

const Ingredients = ({ history }) => {
  const [ingredients, loading, fetchIngredients] = useFetching(getIngredients);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients || []);
  const [itemHovered, setItemHovered] = useState(null);

  const mouseEnterHandler = id => () => setItemHovered(id);
  const onMouseLeave = () => setItemHovered(null);

  const onAddNew = () => history.push('/ingredients/new');
  const editClickHandler = id => () => history.push(`/ingredients/${id}`);
  const ingredientDeleteHandler = id => async () => {
    const res = await deleteIngredient(id);
    if (res) fetchIngredients();
  };
  return (
    <Layout
      title="INGREDIENTS"
      tools={(
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flexGrow: 17 }}>
            <Button
              icon="add"
              label={{ basic: true, content: 'New ingredient' }}
              labelPosition="right"
              onClick={onAddNew}
            />
          </div>
          <ToolsBar
            data={ingredients}
            storeFilteredData={setFilteredIngredients}
            filterFn={ingredientsFilter}
          />
        </div>
      )}
      bottom={loading ? (
        <Loader />
      ) : (
        <div>
          {filteredIngredients && filteredIngredients.length ? (
            <Item.Group divided>
              {filteredIngredients.map(({
                id, name, image, tags, calories
              }) => (
                <ListItem
                  key={id}
                  onMouseEnter={mouseEnterHandler(id)}
                  onMouseLeave={onMouseLeave}
                  image={image}
                  title={name}
                  statistic={calories}
                  tags={tags}
                  hovered={itemHovered === id}
                  onEdit={editClickHandler(id)}
                  onDelete={ingredientDeleteHandler(id)}
                />
              ))}
            </Item.Group>
          ) : /* !ingredients.length ? */'Create an ingredient'/* : 'No results found' */}
        </div>
      )}
    />
  );
};

Ingredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default Ingredients;
