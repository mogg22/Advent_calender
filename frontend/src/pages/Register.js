import "../styles/Register.css";
import Title from "../img/title.png";

function Register() {
  return (
    <div className="start-page">
      <div className="page-bg">
        <div className="center">
          <div className="register-content">
            <div className="title">
                <img src={Title}/>
            </div>
            <div className="name">
              <p>닉네임</p>
              <input className="blank" type="text" />
            </div>
            <div className="password">
              <p>비밀번호</p>
              <input className="blank" type="password" />
            </div>
            <div className="check">
              <p>비밀번호 확인</p>
              <input className="blank" type="password" />
            </div>
            <div className="tosend">
              <p>누구에게 트리를 보낼까요?</p>
              <input className="blank" type="text" />
            </div>
            <div className="submit">
              <p>회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;