import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

const DeletePopup = ({ children, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      {cloneElement(children, { onClick: openModal })}
      <Modal
        size="mini"
        closeIcon
        open={isModalOpen}
        onClose={closeModal}
      >
        <Modal.Content>Are you sure?</Modal.Content>
        <Modal.Actions>
          <Button onClick={onDelete} style={{ background: '#d11a2a', color: '#fff' }}>Delete</Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

DeletePopup.propTypes = {
  children: PropTypes.element.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DeletePopup;
