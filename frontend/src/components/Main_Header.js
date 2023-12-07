import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Main_Header.css";

import logout from "../img/logout.png";
import setting from "../img/settings.png";

function Main_Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      await axios.delete("http://localhost:8080/api/users/logout");
      console.log("User logout is successful");

      // Clear authentication tokens from local storage
      localStorage.removeItem("accessToken");

      // Reset Authorization header
      delete axios.defaults.headers.common["Authorization"];

      // Redirect to the login page
      navigate("/"); // 로그인 페이지의 경로로 변경 가능
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <div className="Header">
      <div className="hd-img">
        <Link to="/mypage">
          <img src={setting} alt="설정" />
        </Link>
        <Link to="/">
          <img src={logout} alt="로그아웃" onClick={handleLogout} />
        </Link>
      </div>
    </div>
  );
}

export default Main_Header;
