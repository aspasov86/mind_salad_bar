/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { find, uniq } from 'lodash';
import Item from 'semantic-ui-react/dist/commonjs/views/Item/Item';
import List from 'semantic-ui-react/dist/commonjs/elements/List/List';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import { getSalads } from '../../services/services';
import Layout from '../Layout/Layout';
import useInput from '../../hooks/Input';
import salad1 from '../../media/salad1.png';
import salad2 from '../../media/salad2.png';

const activeStyle = {
  boxShadow: '0 5px 16px rgba(62, 180, 119, 0.19)',
  borderLeft: '2px solid #3EB477'
};

const saladsImages = [salad1, salad2];

const caloriesReducer = ingredients => ingredients.reduce((ttl, curr) => ttl + curr.calories, 0);

const Salads = ({ history }) => {
  const [salads, setSalads] = useState([]);
  const [activeSaladId, setActiveSaladId] = useState(null);
  const activeSalad = useMemo(() => find(salads, ['id', activeSaladId]), [activeSaladId]);
  const [searchTerm, searchTermHandler] = useInput();
  const [tagFilter, tagFilterHandler] = useInput();
  const allUniqSaladTags = useMemo(() => {
    let tags = [];
    if (salads.length) {
      tags = salads.reduce((ttl, curr) => ttl.concat(curr.tags), []);
    }
    return uniq(tags);
  }, [salads]);
  const [caloriesSortType, setCaloriesSortType] = useState('desc');
  const [filteredSalads, setFilteredSalads] = useState(salads);

  useEffect(() => {
    getSalads().then(setSalads);
  }, []);

  useEffect(() => {
    setFilteredSalads(salads);
  }, [salads]);

  useEffect(() => {
    setFilteredSalads(
      salads.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(({ tags }) => (tagFilter ? tags.includes(tagFilter) : true))
        .sort((a, b) => {
          const caloriesA = caloriesReducer(a.ingredients);
          const caloriesB = caloriesReducer(b.ingredients);
          return caloriesSortType === 'asc' ? caloriesA - caloriesB : caloriesB - caloriesA;
        })
    );
  }, [searchTerm, tagFilter, caloriesSortType]);

  const onAddNew = () => history.push('/salads/new');
  const sortByCaloriesHandler = () => setCaloriesSortType(caloriesSortType === 'desc' ? 'asc' : 'desc');
  const activeHandler = id => () => setActiveSaladId(id);

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
          <div style={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
            <Input
              placeholder="Search by name..."
              icon="search"
              value={searchTerm}
              onChange={searchTermHandler}
            />
            <Dropdown
              placeholder="Filter by tag..."
              selection
              options={allUniqSaladTags.map(tag => ({ key: tag, text: tag, value: tag }))}
              value={tagFilter}
              onChange={tagFilterHandler}
              disabled={!allUniqSaladTags.length}
              clearable
            />
            <div style={{ display: 'flex' }}>
              <div style={{ alignSelf: 'center', marginRight: '.5rem' }}>Sort by calories</div>
              <Button
                icon={`sort numeric ${caloriesSortType === 'asc' ? 'down' : 'up'}`}
                circular
                onClick={sortByCaloriesHandler}
              />
            </div>
          </div>
        </div>
      )}
      bottomLeft={(
        <div>
          {filteredSalads.length ? (
            <Item.Group divided>
              {filteredSalads.map(({
                id, name, ingredients, tags
              }, index) => (
                <Item
                  key={id}
                  onClick={activeHandler(id)}
                  style={activeSaladId === id ? { ...activeStyle, padding: '1em' } : { padding: '1em' }}
                >
                  <Item.Image src={saladsImages[index % 2]} style={{ width: '9rem' }} />
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
                </Item>
              ))}
            </Item.Group>
          ) : !salads.length ? 'Create a salad' : 'No results found'}
        </div>
      )}
      bottomRight={activeSalad && (
        <div>
          <Header>{activeSalad.name}</Header>
          {!activeSalad.ingredients.length ? (
            <div>No ingredients</div>
          ) : (
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
          )}
        </div>
      )}
    />
  );
};

export default Salads;
