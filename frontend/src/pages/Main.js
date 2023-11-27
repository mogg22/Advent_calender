import React, { useState, useEffect } from "react";
import Main_Header from "../components/Main_Header";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "../styles/Main.css";

function Main() {
  const boxNumbers = Array.from({ length: 25 }, (_, index) => index + 1);
  const chunkedBoxNumbers = [];
  for (let i = 0; i < boxNumbers.length; i += 5) {
    chunkedBoxNumbers.push(boxNumbers.slice(i, i + 5));
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to get the current date in the format `${month}.${day}`
    const getCurrentDate = () => {
      const date = new Date();
      const month = date.getMonth() + 1; // Months are zero-indexed
      const day = date.getDate();
      return `${month}.${day}`;
    };

    // Set the current date when the component mounts
    setCurrentDate(getCurrentDate());
  }, []);

  const openModal = () => {
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
              <p style={{ marginLeft: 20 }}>{currentDate}</p>
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

      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

export default Main;
