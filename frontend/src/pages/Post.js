import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Post_Header from "../components/Post_Header";
import "../styles/Post.css";
import ribbon from "../img/ribbon.png";

function Post() {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달받은 토큰 값을 추출
  const { accessToken } = location.state || { accessToken: null };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = getCurrentDate();
    const formData = new FormData(event.target);
    formData.append("currentDate", currentDate);

    // 여기서 accessToken을 사용하여 필요한 작업 수행
    // ...

    // main 페이지로 navigate 할 때 accessToken을 전달
    navigate("/main", { state: { accessToken } });
  };

  return (
    <div className="main-page">
      <div className="page-bg">
        <div className="center">
          <div className="post-content">
            <Post_Header />
            <div className="ribbon">
              <img src={ribbon} alt="리본" />
            </div>
            <div className="white-door-post">
              <div className="post-title">
                <p>이야기를 담아주세요</p>
              </div>
              <div className="post-write">
                <form onSubmit={handleSubmit}>
                  <div className="write-content">
                    <textarea name="comment" placeholder="담길 이야기"></textarea>
                  </div>
                  <input type="hidden" name="currentDate" value={getCurrentDate()} />
                  <div className="submit-btn">
                    <input type="submit" value="담기" name="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
