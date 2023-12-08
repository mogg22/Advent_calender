import { Link } from "react-router-dom";
// import "../styles/Header.css";

import back from "../img/back.png";
import ticket from "../img/ticket.png";

function Header() {
  return (
    <div className="Header">
      <div className="hd-img">
        <div className="setting-ticket">
          <Link to="/main">
            <img src={back} alt="뒤로가기" />
          </Link>
          <div className="ticket-box">
            <div className="ticket-img">
              <img src={ticket} alt="티켓" />
            </div>
            <p>3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
