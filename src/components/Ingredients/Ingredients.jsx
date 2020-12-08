import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { getIngredients, deleteIngredient } from '../../services/ingredientService';
import Layout from '../Layout/Layout';
import TopBar from '../Layout/TopBar';
import ListItem from '../ListItem/ListItem';
import ToolsBar from '../ToolsBar/ToolsBar';
import ingredientsFilter from './ingredientsFilter';
import useFetching from '../../hooks/Fetching';
import useHover from '../../hooks/Hover';
import Loader from '../Loader/Loader';
import EmptyPlaceholder from '../EmptyPlaceholder/EmptyPlaceholder';
import styles from './Ingredients.module.scss';

const Ingredients = ({ history }) => {
  const [ingredients, loading, fetchIngredients] = useFetching(getIngredients);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients || []);
  const [itemHovered, mouseEnterHandler, onMouseLeave] = useHover();

  const onAddNew = () => history.push('/ingredients/new');
  const editClickHandler = id => () => history.push(`/ingredients/${id}`);
  const ingredientDeleteHandler = id => async () => {
    const res = await deleteIngredient(id);
    if (res) fetchIngredients();
  };
  return (
    <Layout
      title="Ingredients"
      tools={(
        <TopBar
          left={(
            <div className={styles.newBtn}>
              <Button
                icon="add"
                label={{ basic: true, content: 'New ingredient' }}
                labelPosition="right"
                onClick={onAddNew}
              />
            </div>
          )}
          right={(
            <ToolsBar
              data={ingredients}
              storeFilteredData={setFilteredIngredients}
              filterFn={ingredientsFilter}
            />
          )}
        />
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
          ) : (
            <EmptyPlaceholder
              filteredData={filteredIngredients}
              data={ingredients}
              itemName="ingredient"
            />
          )}
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
