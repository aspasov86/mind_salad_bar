import React, { useState, useMemo, useEffect } from 'react';
import { uniq } from 'lodash';
import PropTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import useInput from '../../hooks/Input';

const caloriesReducer = ingredients => ingredients.reduce((ttl, curr) => ttl + curr.calories, 0);

const SaladsListTools = ({ salads, onAddNew, setFilteredSalads }) => {
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

  const sortByCaloriesHandler = () => setCaloriesSortType(caloriesSortType === 'desc' ? 'asc' : 'desc');
  return (
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
  );
};

SaladsListTools.propTypes = {
  salads: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAddNew: PropTypes.func.isRequired,
  setFilteredSalads: PropTypes.func.isRequired
};

export default SaladsListTools;
