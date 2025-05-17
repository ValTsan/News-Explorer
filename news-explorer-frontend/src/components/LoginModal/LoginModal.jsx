import "../LoginModal/LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useEffect } from "react";

function LoginModal({
  onLogin,
  isOpen,
  onClose,
  buttonText,
  setActiveModal,
  handleRegisterModal,
}) {
  // console.log("LoginModal rendered, isOpen:", isOpen);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isOpen === true) {
      setUserEmail("");
      setUserPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isOpen]);

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const user = {
    email: userEmail,
    password: userPassword,
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!userEmail) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+.\S+/.test(userEmail)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    // Password validation
    if (!userPassword) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      onLogin(user);
    }
  }

  return (
    <ModalWithForm
      title="Sign In"
      name="register-user"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText="Submit"
    >
      <fieldset className="modal__inputs">
        <label className="modal__label">
          Email
          <input
            className={`modal__input ${
              emailError ? "modal__input_type_error" : ""
            }`}
            type="email"
            name="email"
            placeholder="Email"
            value={userEmail}
            minLength="1"
            maxLength="50"
            onChange={handleEmailChange}
          />
          {emailError && <span className="modal__error">{emailError}</span>}
        </label>

        <label className="modal__label">
          Password
          <input
            className={`modal__input ${
              passwordError ? "modal__input_type_error" : ""
            }`}
            type="password"
            name="password"
            placeholder="Password"
            value={userPassword}
            minLength="1"
            maxLength="1000"
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <span className="modal__error">{passwordError}</span>
          )}
        </label>
      </fieldset>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__login_submit"
          onSubmit={handleSubmit}
        >
          Sign in
        </button>

        <button
          type="button"
          className="modal__sign-up_button"
          onClick={handleRegisterModal}
        >
          {/* or Sign Up */}
          <span>or&nbsp;</span> <span className="highlighted"> Sign up</span>
        </button>
      </div>
    </ModalWithForm>
  );
}
export default LoginModal;
