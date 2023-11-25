import React, { useState } from 'react';
import Modal_deco from '../components/Modal_deco';
import Header from "../components/Header";
import "../styles/Tree.css";
import Plus from '../components/Plus';
import before from "../img/before.png";
import after from "../img/after.png";

function Tree() {

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };

  return (
    <div className="tree-page">
      <div className="page-bg">
        <div className="center">
          <div className="tree-content">
            <Header />
            <div className='receiver'>
              <p>엄마를 위한 트리</p>
            </div>
            <div className="tree-bg">
              <div className='tree-left-btn'>
                <img src={before}/>
              </div>
              <div className='decoration'>
                <div className='row-1'>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                </div>
                <div className='row-2'>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                </div>
                <div className='row-3'>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                </div>
                <div className='row-4'>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                  <Plus onClick={showModal}/>
                </div>
              </div>
              <div className='tree-right-btn'>
                <img src={after}/>
              </div>
            </div>
            <div className='send-btn'><p>트리 보내기</p></div>
            {modalOpen && <Modal_deco setModalOpen={setModalOpen}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tree;
