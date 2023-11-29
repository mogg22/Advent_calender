import "../styles/Login.css";
import Title from "../img/title.png";

function Login() {
  return (
    <div className="start-page">
      <div className="page-bg">
        <div className="center">
          <div className="login-content">
            <div className="title">
                <img src={Title}/>
            </div>
            <div className="name">
              <label>닉네임</label>
              <input className="blank" type="text" />
            </div>
            <div className="password">
              <label>비밀번호</label>
              <input className="blank" type="password" />
            </div>
            <button>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
