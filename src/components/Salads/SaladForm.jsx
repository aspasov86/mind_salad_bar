import React, { useEffect, useState } from 'react';
import { find, get } from 'lodash';
import PropTypes from 'prop-types';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import useInput from '../../hooks/Input';
import { getIngredients, createSaladData, updateSaladData } from '../../services/services';
import Layout from '../Layout/Layout';
import useCheckboxes from './useCheckboxes';
import useAsyncSave from '../../hooks/AsyncSave';
import ToolsBar from '../ToolsBar/ToolsBar';
import ingredientsFilter from '../Ingredients/ingredientsFilter';
import useFetching from '../../hooks/Fetching';
import Loader from '../Loader/Loader';

const SaladForm = ({
  history, mode, data, loading
}) => {
  const [ingredients, loadingIngredients] = useFetching(getIngredients);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients || []);
  const [options, setOptions] = useState([{ key: '1', text: 'gluten-free', value: 'gluten-free' }]);
  const [saladName, onSaladNameChange, setSaladName] = useInput();
  const [saladTags, onSaladTagsChange, setTags] = useInput([]);
  const [
    saladIngredients, checkIfSelected, checkboxClickHandler
  ] = useCheckboxes(ingredients, get(data, 'ingredients'));
  const onBack = () => history.push('/salads');
  const [creating, create] = useAsyncSave(
    async () => createSaladData({ name: saladName, tags: saladTags, ingredients: saladIngredients }),
    onBack
  );
  const [updating, update] = useAsyncSave(
    async () => {
      const saladIngredientsForRemoval = data.ingredients.filter(({ id }) => !find(saladIngredients, ['id', id]));
      const saladIngredientsForAddition = saladIngredients.filter(({ id }) => !find(data.ingredients, ['id', id]));
      const res = await updateSaladData({
        id: data.id,
        name: saladName,
        tags: saladTags,
        ingredients: saladIngredientsForAddition
      }, saladIngredientsForRemoval);
      return res;
    },
    onBack
  );

  useEffect(() => {
    if (data) {
      setSaladName(data.name);
      setOptions([...data.tags.map(tag => ({ key: tag, value: tag, text: tag })), ...options]);
      setTags(data.tags);
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);

  const onSave = async () => (mode === 'edit' ? update() : create());

  return (
    <Layout
      title={mode === 'create' ? 'NEW SALAD' : 'EDIT SALAD'}
      tools={(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon="arrow left"
            label={{ basic: true, content: 'Salads' }}
            labelPosition="right"
            onClick={onBack}
          />
          <Button
            icon="save outline"
            label={{ basic: true, content: 'Save' }}
            onClick={onSave}
            labelPosition="left"
            loading={creating || updating}
          />
        </div>
      )}
      bottomRight={(
        <Grid columns={1} style={{ marginRight: 0 }}>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Salad
                {' '}
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>name</span>
                {' '}
                is required. It doesn&apos;t have to be unique.
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
                can be added and/or removed. Salads can be filtered by them. They are not required.
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                <span style={{ fontWeight: 900, textTransform: 'uppercase' }}>Ingrediens</span>
                {' '}
                can be added by clicking on a checkbox. They can be removed by unchecking. They are not required.
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
                  value={saladName}
                  onChange={onSaladNameChange}
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
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ flexGrow: 17, fontSize: '.93rem', alignSelf: 'flex-end' }}>
                  Ingredients
                </div>
                <ToolsBar
                  data={ingredients}
                  storeFilteredData={setFilteredIngredients}
                  filterFn={ingredientsFilter}
                />
              </div>
              <Segment.Group style={{ maxHeight: '54vh', minHeight: '20vh', overflowY: 'scroll' }}>
                {loadingIngredients ? (
                  <Loader />
                ) : (
                  filteredIngredients && filteredIngredients.length && filteredIngredients.map(({
                    id, name, image, tags, calories
                  }) => (
                    <Segment key={id}>
                      <Grid columns="equal">
                        <Grid.Column width={1} textAlign="center" verticalAlign="middle">
                          <Checkbox disabled={loading} checked={checkIfSelected(id)} onChange={checkboxClickHandler(id)} />
                        </Grid.Column>
                        <Grid.Column width={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                          <Image src={image} style={{ height: '4rem', width: '4rem' }} rounded />
                        </Grid.Column>
                        <Grid.Column>
                          <Grid.Row>
                            <Header>{name}</Header>
                          </Grid.Row>
                          <Grid.Row>
                            {tags.map(tag => <Label key={tag}>{tag}</Label>)}
                          </Grid.Row>
                        </Grid.Column>
                        <Grid.Column textAlign="right" verticalAlign="middle">
                          <Statistic size="mini">
                            <Statistic.Value>
                              {calories}
                            </Statistic.Value>
                            <Statistic.Label>Calories</Statistic.Label>
                          </Statistic>
                        </Grid.Column>
                      </Grid>
                    </Segment>
                  ))
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
  mode: PropTypes.oneOf(['create', 'edit']).isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.shape({}))
  }),
  loading: PropTypes.bool
};

export default SaladForm;
