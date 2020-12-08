import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import useInput from '../../hooks/Input';
import useMultiselect from '../../hooks/Multiselect';
import { createIngredient, updateIngredient } from '../../services/ingredientService';
import Layout from '../Layout/Layout';
import useAsyncSave from '../../hooks/AsyncSave';
import { CREATE, EDIT } from '../../constants/constants';
import useSimpleFormValidation from '../../hooks/FormValidation';
import useFormStateChangeChecker from '../../hooks/FormStateChangeChecker';
import FormInfo from '../FormInfo/FormInfo';
import FormButtons from '../FormButtons/FormButtons';
import styles from './IngredientsForm.module.scss';

const IngredientsForm = ({
  history, mode, data, loading
}) => {
  const [ingredientName, onIngredientNameChange] = useInput('', get(data, 'name'));
  const [
    ingredienTags, onIngredienTagsChange, options, onAddItem
  ] = useMultiselect([], [{ key: '1', text: 'gluten-free', value: 'gluten-free' }], get(data, 'tags'));
  const [ingredientImage, onIngredientImageChange] = useInput('', get(data, 'image'));
  const [ingredientCalories, onIngredientCaloriesChange] = useInput('', get(data, 'calories'));
  const [errors, checkIfFormValid] = useSimpleFormValidation({
    name: ingredientName,
    image: ingredientImage,
    calories: ingredientCalories
  });
  const saveDisabled = useFormStateChangeChecker({
    name: get(data, 'name', ''),
    tags: get(data, 'tags', []),
    image: get(data, 'image', ''),
    calories: get(data, 'calories', '')
  }, {
    name: ingredientName,
    tags: ingredienTags,
    image: ingredientImage,
    calories: !parseInt(ingredientCalories, 10) && parseInt(ingredientCalories, 10) !== 0 ? '' : parseInt(ingredientCalories, 10)
  });
  const onBack = () => history.push('/ingredients');

  const [saving, onSave] = useAsyncSave(async () => {
    let res = null;
    const fetchData = {
      name: ingredientName,
      tags: ingredienTags,
      image: ingredientImage,
      calories: parseInt(ingredientCalories, 10)
    };
    if (mode === EDIT && data) {
      res = await updateIngredient(data.id, fetchData);
    } else {
      res = await createIngredient(fetchData);
    }
    return res;
  }, onBack, checkIfFormValid);

  return (
    <Layout
      title={mode === CREATE ? 'New ingredient' : 'Edit ingredient'}
      tools={(
        <FormButtons
          backBtnText="Ingredients"
          onBack={onBack}
          onSave={onSave}
          saving={saving}
          saveDisabled={saveDisabled}
        />
      )}
      bottomRight={(
        <FormInfo
          infoPieces={[
            {
              accentPart: 1,
              textParts: ['Ingredient', 'name', 'is required. It doesn\'t have to be unique. It\'s required']
            },
            {
              accentPart: 1,
              textParts: [
                'Multiple', 'tags', 'can be added and/or removed. Ingredients can be filtered by them. They are not required.'
              ]
            },
            {
              accentPart: 1,
              textParts: ['Link to the ingredient', 'image', 'is required.']
            },
            {
              accentPart: 1,
              textParts: ['Ingredient', 'calories', 'is required. Only numbers are acceptable.']
            }
          ]}
        />
      )}
      bottomLeft={(
        <Grid columns={1} className={styles.form}>
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
                  error={errors.name}
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
                  error={errors.image}
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
                  error={errors.calories}
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
  mode: PropTypes.oneOf([CREATE, EDIT]).isRequired,
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
