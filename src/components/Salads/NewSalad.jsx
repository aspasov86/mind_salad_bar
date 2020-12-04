import React, { useState } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import useInput from '../../hooks/Input';
import { saveSalad } from '../../services/services';

const NewSalad = ({ history }) => {
  const onBack = () => history.push('/salads');
  const [options, setOptions] = useState([{ key: '1', text: 'gluten-free', value: 'gluten-free' }]);
  const [name, onNameChange] = useInput();
  const [tags, onTagsChange] = useInput();

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);

  const onSave = async () => {
    const res = await saveSalad({ name, tags });
    if (res) onBack();
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
        <Header style={{ margin: 0 }}> New Salad</Header>
        <Button icon labelPosition="left" onClick={onBack}>
          <Icon name="arrow left" />
          Salads
        </Button>
      </div>
      <div>
        <Form>
          <Form.Input label="Name" value={name} onChange={onNameChange} />
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

export default NewSalad;
