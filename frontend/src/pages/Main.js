import Main_Header from "../components/Main_Header";
import { Link } from "react-router-dom";
import "../styles/Main.css";

function Main() {
  return (
    <div className="main-page">
      <div className="page-bg">
        <div className="center">
          <div className="main-content">
            <Main_Header />
            <div className="today-date">
              <p>Today</p>
              <p style={{ marginLeft: 20 }}>12.03</p>
            </div>
            <div className="main-calendar"></div>
            <Link to="/tree">
              <div className="go-tree-btn">
                <p>내 트리 보러가기</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
