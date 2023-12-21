// import Other_Header from "../components/Other_Header";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Mypage.css";
import Header from "../components/Other_Header";
import Title from "../img/title.png";
import Profile from "../img/profile.png";
import Info from "../img/info.png";
import Oneticket from "../img/one-ticket.png";
import Twoticket from "../img/two-ticket.png";

function Mypage() {
  const navigate = useNavigate();
  const [ticketGet, setTicketGet] = useState(0);
  const [ticketGet2, setTicketGet2] = useState(0);
  const [nickname, setNickname] = useState("");

  const location = useLocation();
  const { accessToken } = location.state || { accessToken: null };
  const { refreshToken } = location.state || { refreshToken: null };

  //닉네임 불러오기
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/users/user-info", {
            withCredentials: true,
        });
  
        setNickname(response.data.nickname);
      } catch (error) {
        console.error("Error fetching user information", error);
      }
    };

    fetchNickname();
  }, []);

  //받는이 변경
  const [formData, setFormData] = useState({
    newReceiver: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const newReceive = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/users/update-receiver", formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
        },
        }
      );

      if (response.status === 200) {
        // Handle successful receiver update
        console.log("Receiver updated successfully");
        // Optionally, you can update the local state or perform additional actions.
      } else {
        // Handle receiver update failure
        console.error("Error updating receiver");
      }
    } catch (error) {
      console.error("Error updating receiver", error);
    }
  };

  useEffect(() => {
    const setAuthorizationHeader = () => {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        axios.defaults.headers.common["Authorization"] = storedToken;
      }
    };

    setAuthorizationHeader();
  }, []);

// 티켓 1개 발급
  const handleGetTicket = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/get-ticket",
        {
          withCredentials: true,
        }
      );

      setTicketGet(response.data.ticket);
      navigate("/mypage", { state: { accessToken, refreshToken } });

      if (response.status === 200) {
        // Handle successful ticket issuance
        console.log("Ticket issued successfully");
      } else {
        // Handle ticket issuance failure
        console.error("Error issuing ticket");
      }
    } catch (error) {
      console.error("Error issuing ticket", error);
    }
  };

  // 티켓 2개 발급
  const handleGetTicket2 = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/get-double-ticket",
        {
          withCredentials: true,
        }
      );

      setTicketGet2(response.data.ticket);
      navigate("/mypage", { state: { accessToken, refreshToken } });

      if (response.status === 200) {
        // Handle successful ticket issuance
        console.log("Ticket issued successfully");
      } else {
        // Handle ticket issuance failure
        console.error("Error issuing ticket");
      }
    } catch (error) {
      console.error("Error issuing ticket", error);
    }
  };


  return (
    <div className="my-page">
      <div className="page-bg">
        <div className="center">
          <div className="mypages">
            <Header />
            <div className="mypage-content">
              <div className="mypage-title">
                <img src={Title} />
              </div>
              <div className="name">
                <div className="profile">
                  <img src={Profile} />
                </div>
                <p>{nickname}</p>
              </div>

              <div className="pay">
                <p>이용권 구매</p>
                <img src={Info} alt="이용권설명" />
              </div>
              <div className="ticket">
                <div onClick={handleGetTicket}><img src={Oneticket} alt="1장구매" /></div>
                <div onClick={handleGetTicket2}><img src={Twoticket} alt="2장구매" /></div>
              </div>
              <div className="tosend">
                <p>누구에게 트리를 보낼까요?</p>
                <input className="m-blank" type="text" name="newReceiver" placeholder="받는 사람 변경" onChange={handleInputChange} />
              </div>
              <div className="submit">
                <div className="submit" onClick={newReceive}>
                <p>수정하기</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;