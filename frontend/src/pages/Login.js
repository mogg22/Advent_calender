// import "../styles/Login.css";

function Login() {
  return (
    <div className="start-page">
      <div className="page-bg">
        <div className="center">
          <div className="white-door"></div>
          <div className="title"></div>
          <div className="login-content">
            <div className="ID">
              <p>아이디</p>
              <form></form>
            </div>
            <div className="password">
              <p>비밀번호</p>
              <form></form>
            </div>
            <div className="tosend">
              <p>누구에게 편지를 보내고 싶은가요?</p>
              <form></form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
