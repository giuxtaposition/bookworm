import React from "react";
import "../styles/Header.css";
import { FcReading } from "react-icons/fc";

const Header = () => {
  return (
    <div className="Header">
      <div className="title">
        <FcReading />
        <h1>My Library</h1>
      </div>
      <div className="stats">
        <div className="title">My Stats</div>
        <div className="books-number">Total Books:</div>
        <div className="read-number">Read:</div>
        <div className="unread-number">Not Read:</div>
      </div>
    </div>
  );
};

export default Header;
