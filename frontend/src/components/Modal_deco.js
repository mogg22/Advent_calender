import { useEffect, useRef } from 'react';
import '../styles/Deco.css';

function Modal_deco({ setModalOpen }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handler = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        document.addEventListener('touchstart', handler); // 모바일

        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('touchstart', handler); // 모바일
        };
    }, [modalRef.current, setModalOpen]);

    return (
        <div className="deco-modal" ref={modalRef}>

        </div>
    );
}

export default Modal_deco;