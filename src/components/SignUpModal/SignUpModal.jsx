import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/hooks.jsx";
import "../LoginModal/LoginModal.css";

function SignUpModal({
  isOpen,
  onClose,
  onSignUp,
  onSwitchModal,
  isFormValid = true,
}) {
  const [error, setError] = useState("");
  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    onSignUp(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError(err?.message || "An error occurred during sign up");
      });
  };

  return (
    <ModalWithForm
      name="signup"
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
      secondaryButtonText="or Sign In"
      onSecondaryButtonClick={onSwitchModal}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength={2}
          maxLength={30}
          required
        />
      </label>
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
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </label>
      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default SignUpModal;
