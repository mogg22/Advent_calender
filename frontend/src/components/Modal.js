import React, { useEffect, useState } from "react";
// import ornamentImage from "../img/ornament20.png";
import "../styles/Modal.css";

function Modal({ onClose, boxNumber }) {
  const [ornamentImage, setOrnamentImage] = useState("");

  useEffect(() => {
    // 박스 번호에 해당하는 이미지 설정
    setOrnamentImage(boxNumber || "/path/to/default/image"); // 만약 boxNumber가 falsy하면 기본 이미지 경로를 사용합니다

    const timeoutId = setTimeout(() => {
      onClose();
      // 1.5초 후에 "/main/post"로 리다이렉트
      window.location.href = "/main/post";
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [onClose, boxNumber]);

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <p>박스 번호: {boxNumber}</p> */}
        <img src={ornamentImage} alt="Ornament" />
        {/* 필요에 따라 내용이나 스타일을 추가하세요 */}
      </div>
    </div>
  );
}

export default Modal;
