import React, { useState, useEffect } from "react";
import Main_Header from "../components/Main_Header";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles/Main.css";

import ornament1 from "../img/ornament_big1.png";
import ornament2 from "../img/ornament_big2.png";
import ornament3 from "../img/ornament_big3.png";
import ornament4 from "../img/ornament_big4.png";
import ornament5 from "../img/ornament_big5.png";
import ornament6 from "../img/ornament_big6.png";
import ornament7 from "../img/ornament_big7.png";
import ornament8 from "../img/ornament_big8.png";
import ornament9 from "../img/ornament_big9.png";
import ornament10 from "../img/ornament_big10.png";
import ornament11 from "../img/ornament_big11.png";
import ornament12 from "../img/ornament_big12.png";
import ornament13 from "../img/ornament_big13.png";
import ornament14 from "../img/ornament_big14.png";
import ornament15 from "../img/ornament_big15.png";
import ornament16 from "../img/ornament_big16.png";
import ornament17 from "../img/ornament_big17.png";
import ornament18 from "../img/ornament_big18.png";
import ornament19 from "../img/ornament_big19.png";
import ornament20 from "../img/ornament_big20.png";
import ornament21 from "../img/ornament_big21.png";
import ornament22 from "../img/ornament_big22.png";
import ornament23 from "../img/ornament_big23.png";
import ornament24 from "../img/ornament_big24.png";
import ornament25 from "../img/ornament_big25.png";

const ornamentImages = [ornament1, ornament2, ornament3, ornament4, ornament5, ornament6, ornament7, ornament8, ornament9, ornament10, ornament11, ornament12, ornament13, ornament14, ornament15, ornament16, ornament17, ornament18, ornament19, ornament20, ornament21, ornament22, ornament23, ornament24, ornament25];

function Main() {
  const boxNumbers = Array.from({ length: 25 }, (_, index) => index + 1);
  const chunkedBoxNumbers = [];
  for (let i = 0; i < boxNumbers.length; i += 5) {
    chunkedBoxNumbers.push(boxNumbers.slice(i, i + 5));
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 날짜를 설정하는 함수
    const getCurrentDate = () => {
      const date = new Date();
      const month = date.getMonth() + 1; // 월은 0부터 시작합니다
      const day = date.getDate();
      return `${month}.${day}`;
    };

    // 컴포넌트가 마운트될 때 현재 날짜 설정
    setCurrentDate(getCurrentDate());
  }, []);

  // 열린 박스를 추적하기 위한 상태 변수
  const [openedBoxes, setOpenedBoxes] = useState([]);

  // 박스가 이미 열렸는지 확인하는 함수
  const isBoxOpened = (boxNumber) => openedBoxes.includes(boxNumber);

  // 모달 열기 함수 수정
  const openModal = (boxNumber) => {
    setIsModalOpen(true);

    // 박스 번호에 해당하는 이미지 경로를 모달 컴포넌트에 전달
    setModalContent(ornamentImages[boxNumber - 1]);

    // 열린 박스 상태 업데이트
    setOpenedBoxes([...openedBoxes, boxNumber]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // 모달이 닫힐 때 모달 내용 초기화
    setModalContent(null);
  };

  return (
    <div className="main-page">
      <div className="page-bg">
        <div className="center">
          <div className="main-content">
            <div className="main-hd-center">
              <Main_Header />
            </div>
            <div className="today-date">
              <p>Today</p>
              <p style={{ marginLeft: 20 }}>{currentDate}</p>
            </div>
            <div className="main-calendar-box">
              <div className="main-calendar">
                <div className="boxs">
                  {chunkedBoxNumbers.map((row, rowIndex) => (
                    <div key={rowIndex} className="box-row">
                      {row.map((number) => (
                        <div key={number} className={`box ${isBoxOpened(number) ? "box-opened" : ""}`} onClick={() => openModal(number)}>
                          <p>{number}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/tree">
              <div className="go-tree-btn">
                <p>내 트리 보러가기</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={closeModal} boxNumber={modalContent} />}
    </div>
  );
}

export default Main;
