import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import useInput from '../../hooks/Input';
import { createIngredient, updateIngredient } from '../../services/services';
import Layout from '../Layout/Layout';
import useAsyncSave from '../../hooks/AsyncSave';
import styles from './IngredientsForm.module.scss';

const IngredientsForm = ({
  history, mode, data, loading
}) => {
  const [options, setOptions] = useState([{ key: '1', text: 'gluten-free', value: 'gluten-free' }]);
  const [ingredientName, onIngredientNameChange, setIngredientName] = useInput();
  const [ingredienTags, onIngredienTagsChange, setIngredientTags] = useInput([]);
  const [ingredientImage, onIngredientImageChange, setIngredientImage] = useInput();
  const [ingredientCalories, onIngredientCaloriesChange, setIngredientCalories] = useInput();
  const onBack = () => history.push('/ingredients');
  const [saving, onSave] = useAsyncSave(async () => {
    let res = null;
    const fetchData = {
      name: ingredientName,
      tags: ingredienTags,
      image: ingredientImage,
      calories: parseInt(ingredientCalories, 10)
    };
    if (mode === 'edit' && data) {
      res = await updateIngredient(data.id, fetchData);
    } else {
      res = await createIngredient(fetchData);
    }
    if (res) onBack();
  }, onBack);

  useEffect(() => {
    if (data) {
      setIngredientName(data.name);
      setOptions([...data.tags.map(tag => ({ key: tag, value: tag, text: tag })), ...options]);
      setIngredientTags(data.tags);
      setIngredientImage(data.image);
      setIngredientCalories(data.calories);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);

  return (
    <Layout
      title={mode === 'create' ? 'NEW INGREDIENT' : 'EDIT INGREDIENT'}
      tools={(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon="arrow left"
            label={{ basic: true, content: 'Ingredients' }}
            labelPosition="right"
            onClick={onBack}
          />
          <Button
            icon="save outline"
            label={{ basic: true, content: 'Save' }}
            onClick={onSave}
            loading={saving}
            labelPosition="left"
            className={styles.saveBtn}
          />
        </div>
      )}
      bottomRight={(
        <Grid columns={1} style={{ marginRight: 0 }}>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Ingredient
                {' '}
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>name</span>
                {' '}
                is required. It doesn&apos;t have to be unique. It&apos;s required
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Multiple
                {' '}
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>tags</span>
                {' '}
                can be added and/or removed. Ingredients can be filtered by them. They are not required.
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Link to the ingredient
                {' '}
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>image</span>
                {' '}
                is required.
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment basic>
                Ingredient
                {' '}
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>calories</span>
                {' '}
                is required. Only numbers are acceptable.
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
      bottomLeft={(
        <Grid columns={1} style={{ marginRight: 0 }}>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input
                  label="Name"
                  required
                  value={ingredientName}
                  onChange={onIngredientNameChange}
                  loading={loading}
                  disabled={loading}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Select
                  loading={loading}
                  disabled={loading}
                  label="Tags"
                  value={ingredienTags}
                  options={options}
                  search
                  selection
                  multiple
                  allowAdditions
                  onAddItem={onAddItem}
                  onChange={onIngredienTagsChange}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input
                  required
                  label="Image (link)"
                  value={ingredientImage}
                  onChange={onIngredientImageChange}
                  loading={loading}
                  disabled={loading}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input
                  required
                  label="Calories"
                  type="number"
                  value={ingredientCalories}
                  onChange={onIngredientCaloriesChange}
                  loading={loading}
                  disabled={loading}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    />
  );
};

IngredientsForm.defaultProps = { data: null, loading: null };

IngredientsForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    calories: PropTypes.number
  }),
  loading: PropTypes.bool
};

export default IngredientsForm;
