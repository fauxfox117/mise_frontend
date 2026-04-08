import "../ModalWithForm/ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isFormValid = true,
  secondaryButtonText,
  onSecondaryButtonClick,
  name,
}) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}

        <div className="modal__buttons">
          <button
            className={`modal__submit-btn ${
              !isFormValid ? "modal__submit-btn_disabled" : ""
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
          {secondaryButtonText && (
            <button
              className="modal__secondary-btn"
              type="button"
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
