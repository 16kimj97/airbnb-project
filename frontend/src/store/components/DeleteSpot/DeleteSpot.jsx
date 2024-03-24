import { useDispatch } from "react-redux";
import { deleteSpotById } from "../../spots";
import { useModal } from "../../../context/Modal";
import { useState } from "react";


function DeleteSpotForm({ spotId, onModalClose }) {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const handleDeleteSpot = async () => {
      await dispatch(deleteSpotById(spotId));
      if (onModalClose) {
        onModalClose();
      }
    };

    return (
      <div className="confirmation-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="button-container">
          <button className="delete-button" type="submit" onClick={handleDeleteSpot}>Yes (Delete Spot)</button>
          <button className="cancel-button" type="button" onClick={onModalClose}>No (Keep Spot)</button>
        </div>
      </div>
    );
  }

  export default DeleteSpotForm;
