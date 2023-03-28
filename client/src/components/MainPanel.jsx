import { Link } from "react-router-dom";
import React from "react";

function MainPanel() {
  return (
    <section className="main-panel-section">
      <div className="main-panel">
        <Link to={"/matters"}> Matters </Link>
        {/* <a href="/matters">Matters</a> */}
        <Link to={"/calendar"}> Calendar </Link>
        <Link to={"/notes"}> Notes </Link>
        <Link to={"/Contacts"}> Contacts </Link>

        {/* <a href="/calendar">Calendar</a>
            <a href="/categories">Categories</a>
            <a href="/contacts">Contacts</a> */}
      </div>
    </section>
  );
}

export default MainPanel;
