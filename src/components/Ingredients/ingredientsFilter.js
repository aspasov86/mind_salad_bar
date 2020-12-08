import { CALORIES, ASC } from '../../constants/constants';

const ingredientsFilter = (data, {
  searchTerm, tagFilter, filterBy, sortType
}) => data
  .filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
  .filter(({ tags }) => (tagFilter ? tags.includes(tagFilter) : true))
  .sort((a, b) => {
    let result = 0;
    if (filterBy === CALORIES) {
      result = sortType === ASC ? a.calories - b.calories : b.calories - a.calories;
    } else {
      const itemA = a.name.toLowerCase();
      const itemB = b.name.toLowerCase();
      result = sortType === ASC ? itemA.localeCompare(itemB) : itemB.localeCompare(itemA);
    }
    return result;
  });

export default ingredientsFilter;
