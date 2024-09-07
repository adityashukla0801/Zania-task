import React, { useEffect } from "react";

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <img src={image} alt="Document" />
    </div>
  );
};

export default Modal;
