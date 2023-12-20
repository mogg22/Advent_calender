// import Other_Header from "../components/Other_Header";
import React, { useState } from "react";
// import axios from "axios";
import "../styles/Mypage.css";
import Header from "../components/Other_Header";
import Title from "../img/title.png";
import Profile from "../img/profile.png";

function Register() {
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
    password2: "",
    receiver: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/users/signup", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Handle successful registration
        console.log("User registered successfully");
      } else {
        // Handle registration failure
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="start-page">
      <div className="page-bg">
        <div className="center">
          <div className="mypage-content">
            <Header />
            <div className="title">
              <img src={Title} />
            </div>
            <div className="name">
              <div className="profile">
                <img src={Profile} />
              </div>
              <p>username123</p>
              {/* <input className="blank" type="text" name="nickname"/> */}
              {/* <input className="blank" type="text" name="nickname" onChange={handleInputChange} /> */}
            </div>
            <div className="password">
              <p>비밀번호 변경</p>
              <input className="blank" type="password" name="password"/>
              {/* <input className="blank" type="password" name="password" onChange={handleInputChange} /> */}
            </div>
            <div className="check">
              <p>비밀번호 확인</p>
              <input className="blank" type="password" name="password2" />
              {/* <input className="blank" type="password" name="password2" onChange={handleInputChange} /> */}
            </div>
            <div className="tosend">
              <p>누구에게 트리를 보낼까요?</p>
              <input className="blank" type="text" name="receiver" />
              {/* <input className="blank" type="text" name="receiver" onChange={handleInputChange} /> */}
            </div>
            <div className="submit">
            {/* <div className="submit" onClick={handleSignUp}> */}
              <p>수정하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;