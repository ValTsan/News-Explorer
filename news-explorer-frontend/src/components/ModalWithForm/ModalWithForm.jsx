import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  onSubmit,
  isLoading,
  buttonText,
  secondButtonText,
  onSecondButtonClick,
  onClose,
  isOpen,
  isActive,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__form-container">
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={handleSubmit} noValidate>
          {children}
          <div className="modal__button-container">
            <div className="modal__button-wrapper">
              {secondButtonText && (
                <button
                  type="button"
                  className="modal__button-switch"
                  onClick={onSecondButtonClick}
                  disabled={isLoading}
                >
                  {secondButtonText}
                </button>
              )}
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
              ></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
