import { useEffect, useRef, useState } from 'react';
import '../styles/Send.css';
import stamp from '../img/stamp.png';


function Modal_send({ setModalOpen }) {
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


    const [currentUrl, setCurrentUrl] = useState('');
    useEffect(() => {
        const url = window.location.href;
        setCurrentUrl(url);
        return () => {
        };
    }, []);


    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
        console.log('URL이 클립보드에 복사되었습니다.');
        } catch (err) {
            console.error('클립보드 복사 실패:', err);
        }
    };

    return (
        <div className="send-modal-container">
            <div className='send-modal' ref={modalRef}>
                <div className='stamp'><img src={stamp}></img></div>
                <div className='send-modal-message'><p>트리가 완성되었어요!</p><p>이제 트리를 보내주세요!</p></div>
                <div className='link-area'><p>{currentUrl}</p><div className='copy-btn' onClick={handleCopy}>복사</div></div>
            </div>
        </div>
    );
}

export default Modal_send;