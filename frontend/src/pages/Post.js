import Other_Header from "../components/Other_Header";
import "../styles/Post.css";

import ribbon from "../img/ribbon.png";

function Post() {
  return (
    <div className="main-page">
      <div className="page-bg">
        <div className="center">
          <div className="post-content">
            <Other_Header />
            <div className="ribbon">
              <img src={ribbon} alt="리본" />
            </div>
            <div className="white-door-post">
              <div className="post-title">
                <p>이야기를 담아주세요</p>
              </div>
              <div className="post-write">
                <form action="" method="post">
                  <div class="write-content">
                    <textarea name="comment" placeholder="담길 이야기"></textarea>
                  </div>
                  <div class="submit-btn">
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
