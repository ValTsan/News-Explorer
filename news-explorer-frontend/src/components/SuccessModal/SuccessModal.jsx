import "./SuccessModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, setActiveModal, onClose }) {
  const handleLoginClick = () => {
    onClose();
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      title="Registration successfully completed!"
      isOpen={isOpen}
      onClose={onClose}
      secondButtonText="Sign in"
      onSecondButtonClick={handleLoginClick}
    ></ModalWithForm>
  );
}

export default SuccessModal;
