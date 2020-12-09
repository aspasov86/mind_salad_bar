import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import useInput from '../../hooks/Input';
import { createSalad, updateSalad } from '../../services/saladService';
import { getIngredients } from '../../services/ingredientService';
import Layout from '../Layout/Layout';
import useCheckboxes from './useCheckboxes';
import useAsyncSave from '../../hooks/AsyncSave';
import ToolsBar from '../ToolsBar/ToolsBar';
import ingredientsFilter from '../Ingredients/ingredientsFilter';
import useFetching from '../../hooks/Fetching';
import Loader from '../Loader/Loader';
import FormButtons from '../FormButtons/FormButtons';
import FormInfo from '../FormInfo/FormInfo';
import TopBar from '../Layout/TopBar';
import CheckListItem from '../CheckListItem/CheckListItem';
import EmptyPlaceholder from '../EmptyPlaceholder/EmptyPlaceholder';
import useMultiselect from '../../hooks/Multiselect';
import useFormStateChangeChecker from '../../hooks/FormStateChangeChecker';
import useSimpleFormValidation from '../../hooks/FormValidation';
import { CREATE, EDIT } from '../../constants/constants';
import styles from './SaladForm.module.scss';

const SaladForm = ({
  history, mode, data, loading
}) => {
  const [ingredients, loadingIngredients] = useFetching(getIngredients);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients || []);
  const [saladName, onSaladNameChange] = useInput('', get(data, 'name'));
  const [
    saladTags, onSaladTagsChange, options, onAddItem
  ] = useMultiselect([], [{ key: '1', text: 'gluten-free', value: 'gluten-free' }], get(data, 'tags'));
  const [
    saladIngredients, checkIfSelected, checkboxClickHandler
  ] = useCheckboxes(ingredients, get(data, 'ingredients'));
  const saveDisabled = useFormStateChangeChecker(
    { name: get(data, 'name', ''), tags: get(data, 'tags', []), ingredients: get(data, 'ingredients', []) },
    { name: saladName, tags: saladTags, ingredients: saladIngredients }
  );
  const [errors, checkIfFormValid] = useSimpleFormValidation({ name: saladName });
  const onBack = () => history.push('/salads');

  const [creating, create] = useAsyncSave(
    async () => createSalad({ name: saladName, tags: saladTags, ingredients: saladIngredients }),
    onBack,
    checkIfFormValid
  );
  const [updating, update] = useAsyncSave(
    async () => updateSalad({
      id: data.id, name: saladName, tags: saladTags, ingredients: saladIngredients
    }),
    onBack,
    checkIfFormValid
  );

  const onSave = async () => (mode === EDIT ? update() : create());

  return (
    <Layout
      title={mode === CREATE ? 'New salad' : 'Edit salad'}
      tools={(
        <FormButtons
          backBtnText="Salads"
          onBack={onBack}
          onSave={onSave}
          saving={creating || updating}
          saveDisabled={saveDisabled}
        />
      )}
      bottomRight={(
        <FormInfo
          infoPieces={[
            {
              accentPart: 1,
              textParts: ['Multiple', 'name', 'is required. It doesn\'t have to be unique. It\'s required']
            },
            {
              accentPart: 1,
              textParts: [
                'Multiple custom', 'tags', 'can be added and/or removed. Salads can be filtered by them. They are not required.'
              ]
            },
            {
              accentPart: 0,
              textParts: [
                'Ingrediens', 'can be added by clicking on a checkbox. They can be removed by unchecking. They are not required.'
              ]
            }
          ]}
        />
      )}
      bottomLeft={(
        <Grid columns={1} className={styles.grid}>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Input
                  label="Name"
                  required
                  value={saladName}
                  onChange={onSaladNameChange}
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
                  value={saladTags}
                  options={options}
                  search
                  selection
                  multiple
                  allowAdditions
                  onAddItem={onAddItem}
                  onChange={onSaladTagsChange}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <TopBar
                left={<div className={styles.ingredientsLabel}>Ingredients</div>}
                right={(
                  <ToolsBar
                    data={ingredients}
                    storeFilteredData={setFilteredIngredients}
                    filterFn={ingredientsFilter}
                  />
                )}
              />
              <Segment.Group className={styles.checkList}>
                {loadingIngredients ? (
                  <Loader />
                ) : (
                  <>
                    {filteredIngredients.length ? (
                      filteredIngredients.map(({
                        id, name, image, tags, calories
                      }) => (
                        <CheckListItem
                          key={id}
                          checkboxDisabled={loading}
                          checked={checkIfSelected(id)}
                          onChange={checkboxClickHandler(id)}
                          image={image}
                          name={name}
                          tags={tags}
                          calories={calories}
                        />
                      ))
                    ) : (
                      <EmptyPlaceholder
                        filteredData={filteredIngredients}
                        data={get(data, 'ingredients', [])}
                        itemName="ingredient"
                      />
                    )}
                  </>
                )}
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    />
  );
};

SaladForm.defaultProps = { data: null, loading: null };

SaladForm.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  mode: PropTypes.oneOf([CREATE, EDIT]).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  loading: PropTypes.bool
};

export default SaladForm;
