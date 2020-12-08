import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import styles from './FormButtons.module.scss';

const FormButtons = ({
  backBtnText, onBack, onSave, saving, saveDisabled
}) => (
  <div className={styles.formButtons}>
    <Button
      icon="arrow left"
      label={{ basic: true, content: backBtnText }}
      labelPosition="right"
      onClick={onBack}
    />
    <Button
      icon="save outline"
      disabled={saveDisabled}
      label={{ basic: true, content: 'Save' }}
      onClick={onSave}
      loading={saving}
      labelPosition="left"
      className={styles.saveBtn}
    />
  </div>
);

FormButtons.propTypes = {
  backBtnText: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  saveDisabled: PropTypes.bool.isRequired
};

export default FormButtons;
