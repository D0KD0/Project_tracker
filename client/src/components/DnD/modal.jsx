import React from "react";

const Modal = ({
  ModalTitle,
  closeModal,
  submitModal,
  inputPlaceholder,
  inputValue,
  handleInputChange,
}) => {

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div>{ModalTitle}</div>
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="modalSubmit" onClick={submitModal}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
