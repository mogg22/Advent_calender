import { useNavigate } from "react-router-dom";
import Post_Header from "../components/Post_Header";
import "../styles/Post.css";

import ribbon from "../img/ribbon.png";

function Post() {
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Get the current date
    const currentDate = getCurrentDate();

    // Access the form data and do whatever you need with it
    const formData = new FormData(event.target);
    formData.append("currentDate", currentDate);

    // Perform your form submission logic here
    // For example, you can send the formData to a server or do some other processing
    // ...

    navigate("/main");
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
                <form onSubmit={handleSubmit}>
                  <div class="write-content">
                    <textarea name="comment" placeholder="담길 이야기"></textarea>
                  </div>
                  <input type="hidden" name="currentDate" value={getCurrentDate()} />
                  <div className="submit-btn">
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
