import React, { useState } from "react";
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

      if (response.status === 200) {
        // Handle successful login
        console.log("User logged in successfully");

        // Extract accessToken from the response
        const { accessToken } = response.data;

        // Navigate to the "/main" route with accessToken in the state
        navigate("/main", { state: { accessToken } });
      } else {
        // Handle login failure
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
