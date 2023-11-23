import { Link } from "react-router-dom";
// import "../styles/Header.css";

import back from "../img/back.png";
import setting from "../img/settings.png";

function Header() {
  return (
    <div className="Header">
      <div className="hd-img">
        <Link to="/main">
          <img src={back} alt="뒤로가기" />
        </Link>
        <Link to="/mypage">
          <img src={setting} alt="설정" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
