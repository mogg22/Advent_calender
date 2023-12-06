import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Post_Header from "../components/Post_Header";
import "../styles/Post.css";
import ribbon from "../img/ribbon.png";

function Post() {
  const [postData, setPostData] = useState({
    content: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달받은 토큰 값을 추출
  const { accessToken } = location.state || { accessToken: null };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return { year, month, day };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async () => {
    const { year, month, day } = getCurrentDate(); // Destructure the returned object
    const formattedDay = day.replace(/^0+/, "");
    const currentDate = `${year}-${month}-${formattedDay}`;

    try {
      const response = await axios.post(`http://localhost:8080/api/users/post/${formattedDay}`, postData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 서버로부터의 응답을 확인하고 필요한 작업 수행
      console.log(response.data);

      // main 페이지로 navigate 할 때 accessToken을 전달
      navigate("/main", { state: { accessToken } });
    } catch (error) {
      // 오류 처리
      console.error("Error submitting post:", error);
    }
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
                <div className="write-content">
                  <textarea name="content" placeholder="담길 이야기" onChange={handleInputChange}></textarea>
                </div>
                <div className="submit-btn">
                  <button onClick={handleSubmit}>담기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
