import React, { useState, useEffect } from 'react';
import Modal_send from '../components/Modal_send';
import Header from "../components/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Tree.css";
import Plus from '../components/Plus';
import before from "../img/before.png";
import after from "../img/after.png";

function Tree() {
  const [ornamentOrder, setOrnamentOrder] = useState([]);
  const [sliceStart, setSliceStart] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrnamentOrder = async () => {
      try {
        const response = await axios.get("https://wiscom2023.store/api/users/user-info", {
          withCredentials: true,
        });

        setOrnamentOrder(response.data.ornament);
      } catch (error) {
        console.error("Error fetching user information", error);
      }
    };

    fetchOrnamentOrder();
  }, []);

  const renderOrnaments = () => {
    const ornaments = [];
    for (let i = 1; i <= 25; i++) {
      const ornamentIndex = ornamentOrder.indexOf(i) + 1;
      const isVisible = ornamentOrder.includes(i);

      ornaments.push(
        <Plus key={i} image={ornamentIndex} isVisible={isVisible} />
      );
    }

    return ornaments;
  };

  const handleRightBtnClick = () => {
    // 12씩 증가하며 슬라이싱
    setSliceStart((prev) => (prev + 12) % 25);
  };

  const handleLeftBtnClick = () => {
    // 12씩 감소하며 슬라이싱
    setSliceStart((prev) => (prev - 12 + 25) % 25);
  };

  const handleSendBtnClick = () => {
    // Tree 페이지에서 보내기 버튼이 클릭되면 Post 페이지로 이동하며 토큰을 전달
    navigate("/post", { state: { accessToken: location.state.accessToken } });
  };

  return (
    <div className="tree-page">
      <div className="page-bg">
        <div className="center">
          <div className="tree-content">
            <div className='tree-header-box'>
              <Header />
            </div>
            <div className='receiver'>
              <p>엄마를 위한 트리</p>
            </div>
            <div className='tree-bg-box'>
              <div className="tree-bg">
                <div className='tree-left-btn' onClick={handleLeftBtnClick}>
                  <img src={before} alt="이전" />
                </div>
                <div className='decoration'>
                  <div className='row-1'>
                    {renderOrnaments().slice(sliceStart, sliceStart + 2)}
                  </div>
                  <div className='row-2'>
                    {renderOrnaments().slice(sliceStart + 2, sliceStart + 5)}
                  </div>
                  <div className='row-3'>
                    {renderOrnaments().slice(sliceStart + 5, sliceStart + 8)}
                  </div>
                  <div className='row-4'>
                    {renderOrnaments().slice(sliceStart + 8, sliceStart + 12)}
                  </div>
                </div>
                <div className='tree-right-btn' onClick={handleRightBtnClick}>
                  <img src={after} alt="다음" />
                </div>
              </div>
            </div>
            <div className='send-btn' onClick={handleSendBtnClick}>
              <p>트리 보내기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tree;
