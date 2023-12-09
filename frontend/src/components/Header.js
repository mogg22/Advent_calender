import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import "../styles/Header.css";

import back from "../img/back.png";
import setting from "../img/settings.png";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();
  const { accessToken } = location.state || { accessToken: null };

  const handleMainLink = () => {
    navigate("/main", { state: { accessToken } });
  };

  const handleMypageLink = () => {
    navigate("/mypage", { state: { accessToken } });
  };

  return (
    <div className="Header">
      <div className="hd-img">
        <img src={back} alt="뒤로가기" onClick={handleMainLink} />
        <img src={setting} alt="설정" onClick={handleMypageLink} />
      </div>
    </div>
  );
}

export default Header;
