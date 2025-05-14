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
  const [avatar, setAvatarUrl] = useState("");

  useEffect(() => {
    if (isOpen === true) {
      setUserEmail("");
      setUserPassword("");
      setUserName("");
      setAvatarUrl("");
    }
  }, [isOpen]);

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
    handleRegistration(newUser);
  };

  const newUser = {
    email: userEmail,
    password: userPassword,
    name: userName,
    avatar: avatar,
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
            className="modal__input"
            type="email"
            name="email"
            placeholder="Email"
            value={userEmail}
            minLength="1"
            maxLength="50"
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal__label">
          Password*
          <input
            className="modal__input"
            type="password"
            name="password"
            placeholder="Password"
            value={userPassword}
            minLength="1"
            maxLength="1000"
            onChange={handlePasswordChange}
          />
        </label>
        <label className="modal__label">
          Name*
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
            value={userName}
            minLength="1"
            maxLength="30"
            onChange={handleNameChange}
          />
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
