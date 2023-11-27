import React, { useState } from "react";
import Main_Header from "../components/Main_Header";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles/Main.css";

function Main() {
  // Create an array with numbers from 1 to 25
  const boxNumbers = Array.from({ length: 25 }, (_, index) => index + 1);

  // Divide the boxNumbers array into chunks of 5
  const chunkedBoxNumbers = [];
  for (let i = 0; i < boxNumbers.length; i += 5) {
    chunkedBoxNumbers.push(boxNumbers.slice(i, i + 5));
  }

  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (number) => {
    setSelectedNumber(number);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <p style={{ marginLeft: 20 }}>12.03</p>
            </div>
            <div className="main-calendar-box">
              <div className="main-calendar">
                <div className="boxs">
                  {chunkedBoxNumbers.map((row, rowIndex) => (
                    <div key={rowIndex} className="box-row">
                      {row.map((number) => (
                        <div key={number} className="box" onClick={() => openModal(number)}>
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

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <p>Clicked Box: {selectedNumber}</p>
        </Modal>
      )}
    </div>
  );
}

export default Main;
