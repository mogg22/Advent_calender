import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Title from "../img/title.png";

function Login() {
  const [loginData, setLoginData] = useState({
    nickname: "",
    password: "",
  });

  const navigate = useNavigate();

  // 이펙트를 사용하여 기존에 저장된 토큰이 있는지 확인
  useEffect(() => {
    const existingToken = localStorage.getItem("accessToken");

    if (existingToken) {
      // Authorization 헤더를 설정하고 메인 페이지로 이동
      axios.defaults.headers.common["Authorization"] = `${existingToken}`;
      navigate("/main", { state: { accessToken: existingToken } });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/login", loginData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { accessToken, refreshToken } = response.data;

      if (response.status === 200) {
        // 로그인 성공 시 처리
        console.log("User logged in successfully");

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("accessToken", accessToken);

        // Axios의 기본 헤더에 accessToken 추가
        axios.defaults.headers.common["Authorization"] = `${accessToken}`;

        // 메인 페이지로 리다이렉트
        navigate("/main", { state: { accessToken } });
      } else {
        // 로그인 실패 시 처리
        console.error("Error logging in");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="start-page">
      <div className="page-bg">
        <div className="center">
          <div className="login-content">
            <div className="title">
              <img src={Title} />
            </div>
            <div className="name">
              <label>닉네임</label>
              <input className="blank" type="text" name="nickname" onChange={handleInputChange} />
            </div>
            <div className="password">
              <label>비밀번호</label>
              <input className="blank" type="password" name="password" onChange={handleInputChange} />
            </div>
            <button onClick={handleLogin}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
