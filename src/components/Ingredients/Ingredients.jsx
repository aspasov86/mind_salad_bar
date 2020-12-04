import React, { useEffect, useState } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { getIngredients } from '../../services/services';
import columns from './ingredientColumns';

const Ingredients = ({ history }) => {
  const [ingredients, setingredients] = useState(null);

  useEffect(() => {
    getIngredients().then(setingredients);
  }, []);
  const onAddNew = () => history.push('/ingredients/new');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', padding: '1rem 0 .5rem 0' }}>
        <Header style={{ margin: 0 }}>Ingredients</Header>
        <Button icon labelPosition="left" primary onClick={onAddNew}>
          <Icon name="plus" />
          New ingredient
        </Button>
      </div>
      <div>
        {ingredients ? (
          <Table>
            <Table.Header>
              <Table.Row>
                {columns.map(({ title, name }) => (
                  <Table.HeaderCell key={name}>{title}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ingredients.map(({ id, ...ingredientData }) => (
                <Table.Row key={id}>
                  {columns.map(({ name, type, render }) => (
                    <Table.Cell key={id + ingredientData[name]}>
                      {type === 'image'
                        ? <img src={ingredientData[name]} alt="" />
                        : type === 'array'
                          ? render(ingredientData)
                          : ingredientData[name]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : 'Create an ingredient'}
      </div>
    </div>
  );
};

export default Ingredients;
