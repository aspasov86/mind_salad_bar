import React, { useEffect, useState, useMemo } from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Salad from './Salad';
import SaladIngredientsList from './SaladIngredientsList';
import SaladsListTools from './SaladsListTools';
import { getSalads } from '../../services/services';
import Layout from '../Layout/Layout';
import salad1 from '../../media/salad1.png';
import salad2 from '../../media/salad2.png';
import styles from './Salads.module.scss';

const saladsImages = [salad1, salad2];

const getItemStyle = (activeSaladId, saladId, hoveredSalad) => {
  const defaultStyle = styles.item;
  const activeStyle = activeSaladId === saladId ? styles.active : '';
  const hoverStyle = hoveredSalad === saladId && !activeStyle ? styles.hover : '';
  return `${defaultStyle} ${activeStyle} ${hoverStyle}`;
};

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
      tools={<SaladsListTools salads={salads} onAddNew={onAddNew} setFilteredSalads={setFilteredSalads} />}
      bottomLeft={(
        <div>
          {filteredSalads.length ? (
            <Item.Group divided>
              {filteredSalads.map(({
                id, name, ingredients, tags
              }, index) => (
                <Salad
                  key={id}
                  name={name}
                  tags={tags}
                  onClick={activeHandler(id)}
                  className={getItemStyle(activeSaladId, id, itemHovered)}
                  onMouseEnter={mouseEnterHandler(id)}
                  onMouseLeave={onMouseLeave}
                  image={saladsImages[index % 2]}
                  ingredients={ingredients}
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
