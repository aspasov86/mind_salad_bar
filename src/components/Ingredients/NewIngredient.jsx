import React, { useState } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import useInput from '../../hooks/Input';
import { saveIngredient } from '../../services/services';

const NewIngredient = ({ history }) => {
  const onBack = () => history.push('/ingredients');
  const [options, setOptions] = useState([{ key: '1', text: 'gluten-free', value: 'gluten-free' }]);
  const [name, onNameChange] = useInput();
  const [calories, onCaloriesChange] = useInput();
  const [image, onImageChange] = useInput();
  const [tags, onTagsChange] = useInput();

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);

  const onSave = async () => {
    const res = await saveIngredient({
      name, tags, calories, image
    });
    if (res) onBack();
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', padding: '1rem 0 .5rem 0' }}>
        <Header style={{ margin: 0 }}> New Ingredient</Header>
        <Button icon labelPosition="left" onClick={onBack}>
          <Icon name="arrow left" />
          Ingredients
        </Button>
      </div>
      <div>
        <Form>
          <Form.Input label="Name" value={name} onChange={onNameChange} />
          <Form.Input label="Calories" type="number" value={calories} onChange={onCaloriesChange} />
          <Form.Input label="image" value={image} onChange={onImageChange} />
          <Form.Select
            label="Tags"
            value={tags}
            options={options}
            search
            selection
            multiple
            allowAdditions
            onAddItem={onAddItem}
            onChange={onTagsChange}
          />
        </Form>
        <Form.Button primary onClick={onSave}>Save</Form.Button>
      </div>
    </div>
  );
};

export default NewIngredient;
