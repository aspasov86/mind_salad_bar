const columns = [
  {
    name: 'name',
    title: 'Name',
    type: 'string'
  },
  {
    name: 'calories',
    title: 'Calories',
    type: 'number'
  },
  {
    name: 'image',
    title: 'Image',
    type: 'image'
  },
  {
    name: 'tags',
    title: 'Tags',
    type: 'array',
    render: ({ tags }) => tags.join(', ')
  }
];

export default columns;
