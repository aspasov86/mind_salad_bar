const columns = [
  {
    name: 'name',
    title: 'Name',
    type: 'string'
  },
  {
    name: 'calories',
    title: 'Calories',
    type: 'array',
    render: ({ ingredients }) => ingredients.reduce((ttl, curr) => ttl + curr.calories, 0)
  },
  {
    name: 'ingredients',
    title: 'Ingredients',
    type: 'array',
    render: ({ ingredients }) => ingredients
      .reduce((ttl, curr) => [...ttl, curr.name], [])
      .join(', ')
  },
  {
    name: 'tags',
    title: 'Tags',
    type: 'array',
    render: ({ tags }) => tags.join(', ')
  }
];

export default columns;
