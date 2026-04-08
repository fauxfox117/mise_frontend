// Styles
import "../LoginModal/LoginModal.css";

// React
import { useState } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

// Hooks
import useForm from "../../hooks/hooks.jsx";

function LoginModal({
  isOpen,
  onClose,
  onSignIn,
  onSwitchModal,
  isFormValid = true,
}) {
  const [error, setError] = useState("");
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onSignIn(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError(
          typeof err === "string" ? err : "An error occurred during sign in",
        );
      });
  };

  return (
    <ModalWithForm
      name="signin"
      isOpen={isOpen}
      onClose={onClose}
      title="Sign In"
      buttonText="Sign In"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      secondaryButtonText="or Sign Up"
      onSecondaryButtonClick={onSwitchModal}
    >
      <label className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
