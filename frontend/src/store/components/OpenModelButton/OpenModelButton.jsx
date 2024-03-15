import { useModal } from '../../../context/Modal';
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

// Define prop types
OpenModalButton.propTypes = {
  modalComponent: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
  onModalClose: PropTypes.func
};

export default OpenModalButton;
