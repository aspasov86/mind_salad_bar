import React, { useState, useMemo, useEffect } from 'react';
import { uniq } from 'lodash';
import PropTypes from 'prop-types';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import useInput from '../../hooks/Input';
import {
  CALORIES, NAME, ASC, DESC
} from '../../constants/constants';
import styles from './ToolsBar.module.scss';

const ToolsBar = ({ data, storeFilteredData, filterFn }) => {
  const [searchTerm, searchTermHandler] = useInput();
  const [tagFilter, tagFilterHandler] = useInput();
  const allUniqSaladTags = useMemo(() => {
    let tags = [];
    if (data && data.length) {
      tags = data.reduce((ttl, curr) => ttl.concat(curr.tags), []);
    }
    return uniq(tags);
  }, [data]);
  const [filterBy, filterByHandler] = useInput(CALORIES);
  const [sortType, setSortType] = useState(DESC);

  useEffect(() => {
    storeFilteredData(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data && data.length) {
      storeFilteredData(filterFn(data, {
        searchTerm, tagFilter, filterBy, sortType
      }));
    }
  }, [searchTerm, tagFilter, filterBy, sortType]); // eslint-disable-line react-hooks/exhaustive-deps

  const sortByHandler = () => setSortType(sortType === DESC ? ASC : DESC);
  return (
    <div className={styles.bar}>
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
      <div className={styles.multi}>
        <div className={styles.sortBy}>Sort by</div>
        <Dropdown
          inline
          options={[
            { key: CALORIES, text: CALORIES, value: CALORIES },
            { key: NAME, text: NAME, value: NAME }
          ]}
          value={filterBy}
          onChange={filterByHandler}
        />
        <Button
          icon={`sort numeric ${sortType === ASC ? 'down' : 'up'}`}
          circular
          onClick={sortByHandler}
        />
      </div>
    </div>
  );
};

ToolsBar.defaultProps = { data: null };

ToolsBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  storeFilteredData: PropTypes.func.isRequired,
  filterFn: PropTypes.func.isRequired
};

export default ToolsBar;
