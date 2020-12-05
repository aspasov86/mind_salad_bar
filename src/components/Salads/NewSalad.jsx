import React, { useEffect, useState } from 'react';
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
import { saveSalad, getIngredients } from '../../services/services';
import Layout from '../Layout/Layout';

const NewSalad = ({ history }) => {
  const [ingredients, setIngredients] = useState(null);
  const [options, setOptions] = useState([{ key: '1', text: 'gluten-free', value: 'gluten-free' }]);
  const [saladName, onSaladNameChange] = useInput();
  const [saladTags, onSaladTagsChange] = useInput();

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  const onAddItem = (event, { value }) => setOptions([{ text: value, value }, ...options]);
  const onBack = () => history.push('/salads');
  const onSave = async () => {
    const res = await saveSalad({ name: saladName, tags: saladTags });
    if (res) onBack();
  };

  return (
    <Layout
      title="NEW SALAD"
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
            labelPosition="left"
          />
        </div>
      )}
      bottomRight={(
        <Grid columns={1} style={{ marginRight: 0 }}>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Salad name is required. It doesn't have to be unique.
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Multiple tags can be added and/or removed. Salads can be filtered by them. They are not required.
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment basic>
                Ingrediens can be added by clicking on a checkbox. They can be removed by unchecking. Are not required.
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
                  value={saladName}
                  onChange={onSaladNameChange}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Select
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
              <span style={{ display: 'block', fontSize: '.93rem', marginBottom: '-.4rem' }}>Ingredients</span>
              <Segment.Group style={{ height: '54vh', overflowY: 'scroll' }}>
                {ingredients && ingredients.map(({
                  name, image, tags, calories
                }) => (
                  <Segment>
                    <Grid columns="equal">
                      <Grid.Column width={1} textAlign="center" verticalAlign="middle">
                        <Checkbox />
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
                ))}
              </Segment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    />
  );
};

export default NewSalad;
