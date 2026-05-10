import { useEffect } from "react";
import "./Modal.css";

function Modal({ name, onClose, isOpen, children }) {
  // useEffect for the Escape listener
  useEffect(() => {
    if (!isOpen) return;

    // define the handler inside useEffect so it doesn't lose the reference
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // remove the listener in the clean-up function
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, isOpen]);

  // overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // add the main wrapper with class modal
  return (
    <div
      className={`modal ${isOpen ? "modal__opened" : ""} modal_type_${name}`}
      onClick={handleOverlay}
    >
      {/* the container for the contents */}
      <div className="modal__container">
        {/* here will be anything added as children */}
        {children}
        {/* add the close button */}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default Modal;
