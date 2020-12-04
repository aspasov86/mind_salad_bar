import React, { useEffect, useState } from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { getSalads } from '../../services/services';
import columns from './saladColumns';

const Salads = ({ history }) => {
  const [salads, setSalads] = useState(null);

  useEffect(() => {
    getSalads().then(setSalads);
  }, []);
  const onAddNew = () => history.push('/salads/new');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignContent: 'center' }}>
        <Header style={{ margin: 0 }}>Salads</Header>
        <Button icon labelPosition="left" primary onClick={onAddNew}>
          <Icon name="plus" />
          New salad
        </Button>
      </div>
      <div>
        {salads ? (
          <Table>
            <Table.Header>
              <Table.Row>
                {columns.map(({ title, name }) => (
                  <Table.HeaderCell key={name}>{title}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {salads.map(({ id, ...saladData }) => (
                <Table.Row key={id}>
                  {columns.map(({ name, type, render }) => (
                    <Table.Cell key={id + saladData[name]}>
                      {type === 'array' ? render(saladData) : saladData[name]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : 'Create a salad'}
      </div>
    </div>
  );
};

export default Salads;
