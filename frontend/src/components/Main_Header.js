import { Link } from "react-router-dom";
import "../styles/Main_Header.css";

import logout from "../img/logout.png";
import setting from "../img/settings.png";

function Main_Header() {
  return (
    <div className="Header">
      <div className="hd-img">
        <Link to="/mypage">
          <img src={setting} alt="설정" />
        </Link>
        <Link to="/">
          <img src={logout} alt="로그아웃" />
        </Link>
      </div>
    </div>
  );
}

export default Main_Header;
