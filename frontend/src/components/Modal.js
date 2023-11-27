import React, { useEffect } from "react";
import ornamentImage from "../img/ornament20.png";
import "../styles/Modal.css";

function Modal({ onClose }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
      // Redirect to "/main/post" after 1.5 second
      window.location.href = "/main/post";
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={ornamentImage} alt="Ornament" />
        {/* You can add additional content or styling as needed */}
      </div>
    </div>
  );
}

export default Modal;
