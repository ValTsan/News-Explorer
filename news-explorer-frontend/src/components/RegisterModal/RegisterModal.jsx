import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({
  handleRegistration,
  handleLoginModal,
  isOpen,
  onClose,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");

  // Add new state for validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Clear errors when modal opens
  useEffect(() => {
    if (isOpen === true) {
      setUserEmail("");
      setUserPassword("");
      setUserName("");
      setErrors({
        email: "",
        password: "",
        name: "",
      });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      name: "",
    };

    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(userEmail)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!userPassword) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (userPassword.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Name validation
    if (!userName) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleRegistration(newUser);
    }
  };

  const newUser = {
    email: userEmail,
    password: userPassword,
    name: userName,
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register-user"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <fieldset className="modal__inputs">
        <label className="modal__label">
          Email*
          <input
            className={`modal__input ${
              errors.email ? "modal__input_type_error" : ""
            }`}
            type="email"
            name="email"
            placeholder="Email"
            value={userEmail}
            minLength="1"
            maxLength="50"
            onChange={handleEmailChange}
          />
          {errors.email && <span className="modal__error">{errors.email}</span>}
        </label>

        <label className="modal__label">
          Password*
          <input
            className={`modal__input ${
              errors.password ? "modal__input_type_error" : ""
            }`}
            type="password"
            name="password"
            placeholder="Password"
            value={userPassword}
            minLength="1"
            maxLength="1000"
            onChange={handlePasswordChange}
          />
          {errors.password && (
            <span className="modal__error">{errors.password}</span>
          )}
        </label>

        <label className="modal__label">
          Name*
          <input
            className={`modal__input ${
              errors.name ? "modal__input_type_error" : ""
            }`}
            type="text"
            name="name"
            placeholder="Name"
            value={userName}
            minLength="1"
            maxLength="30"
            onChange={handleNameChange}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
        </label>
      </fieldset>
      <div className="modal__button-container">
        <button type="submit" className="modal__submit">
          Sign Up
        </button>
        <button
          type="button"
          className="modal__login"
          onClick={handleLoginModal}
        >
          {" "}
          <span>or&nbsp;</span> <span className="highlighted"> Sign In</span>
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
