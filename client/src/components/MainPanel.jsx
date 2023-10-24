import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";

function MainPanel() {
  const handleLogout = () => {
    axios
      .post("/logout")
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };
  return (
    <section className="main-panel-section">
      <div className="main-panel">
        <Link to={"/matters"}> Matters </Link>
        {/* <a href="/matters">Matters</a> */}
        <Link to={"/calendar"}> Calendar </Link>
        <Link to={"/notes"}> Notes </Link>
        <button
          className="logout-button"
          title="Logout"
          onClick={handleLogout}
        ></button>
      </div>
    </section>
  );
}

export default MainPanel;
