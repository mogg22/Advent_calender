import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/index.css";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <div>
      <Helmet>
        <title>ToTree</title>
      </Helmet>
    </div>
  </React.StrictMode>
);
