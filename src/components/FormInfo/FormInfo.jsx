import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import styles from './FormInfo.module.scss';

const FormInfo = ({ infoPieces }) => (
  <Grid columns={1} className={styles.grid}>
    {infoPieces.map(infoPeace => (
      <Grid.Row key={infoPeace.textParts.join()}>
        <Grid.Column>
          <Segment basic>
            {infoPeace.textParts.map((part, index) => {
              let content = part;
              if (index === infoPeace.accentPart) {
                content = (
                  <>
                    {' '}
                    <span>{part}</span>
                    {' '}
                  </>
                );
              }
              return <Fragment key={part}>{content}</Fragment>;
            })}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    ))}
  </Grid>
);

FormInfo.propTypes = {
  infoPieces: PropTypes.arrayOf(PropTypes.shape({
    accentPart: PropTypes.number,
    textParts: PropTypes.arrayOf(PropTypes.string)
  })).isRequired
};

export default FormInfo;
