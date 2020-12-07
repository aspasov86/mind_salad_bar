import React, { useEffect, useState, useMemo } from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import ListItem from '../ListItem/ListItem';
import SaladIngredientsList from './SaladIngredientsList';
import ToolsBar from '../ToolsBar/ToolsBar';
import { getSalads } from '../../services/services';
import Layout from '../Layout/Layout';
import salad1 from '../../media/salad1.png';
import salad2 from '../../media/salad2.png';
import styles from './Salads.module.scss';
import saladsFilter from './saladsFilter';

const saladsImages = [salad1, salad2];

const Salads = ({ history }) => {
  const [salads, setSalads] = useState([]);
  const [activeSaladId, setActiveSaladId] = useState(null);
  const activeSalad = useMemo(() => find(salads, ['id', activeSaladId]), [activeSaladId]);
  const [filteredSalads, setFilteredSalads] = useState(salads);
  const [itemHovered, setItemHovered] = useState(null);

  const mouseEnterHandler = id => () => setItemHovered(id);
  const onMouseLeave = () => setItemHovered(null);

  useEffect(() => {
    getSalads().then(setSalads);
  }, []);

  useEffect(() => {
    if (!find(filteredSalads, ['id', activeSaladId])) setActiveSaladId(null);
  }, [filteredSalads]);

  const onAddNew = () => history.push('/salads/new');
  const activeHandler = id => () => setActiveSaladId(id);
  const editClickHandler = id => () => history.push(`/salads/${id}`);
  return (
    <Layout
      title="SALADS"
      tools={(
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <div style={{ flexGrow: 17 }}>
            <Button
              icon="add"
              label={{ basic: true, content: 'New salad' }}
              labelPosition="right"
              onClick={onAddNew}
            />
          </div>
          <ToolsBar
            data={salads}
            storeFilteredData={setFilteredSalads}
            filterFn={saladsFilter}
          />
        </div>
      )}
      bottomLeft={(
        <div>
          {filteredSalads.length ? (
            <Item.Group divided>
              {filteredSalads.map(({
                id, name, ingredients, tags
              }, index) => (
                <ListItem
                  key={id}
                  title={name}
                  tags={tags}
                  onClick={activeHandler(id)}
                  activeClassName={styles.active}
                  onMouseEnter={mouseEnterHandler(id)}
                  onMouseLeave={onMouseLeave}
                  image={saladsImages[index % 2]}
                  description={(
                    ingredients.length
                      ? `Ingredients: ${ingredients.map((ingredient => ingredient.name)).join(', ')}`
                      : 'No ingredients'
                  )}
                  statistic={ingredients.reduce((ttl, curr) => ttl + curr.calories, 0)}
                  hovered={itemHovered === id}
                  onEdit={editClickHandler(id)}
                />
              ))}
            </Item.Group>
          ) : /* !salads.length ? */'Create a salad'/* : 'No results found' */}
        </div>
      )}
      bottomRight={activeSalad && (
        <div>
          <Header>{activeSalad.name}</Header>
          {!activeSalad.ingredients.length ? (
            <div>No ingredients</div>
          ) : (
            <SaladIngredientsList activeSalad={activeSalad} />
          )}
        </div>
      )}
    />
  );
};

Salads.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default Salads;
