import React from "react";
import "../styles/Header.css";
import { FcReading } from "react-icons/fc";
import useWindowSize from "../utils/useWindowSize";
import Stats from "./Stats";

const Header = () => {
  const { width } = useWindowSize();

  return (
    <div className="Header">
      <div className="title">
        <FcReading />
        <h1>My Library</h1>
      </div>
      {width > 800 && <Stats />}
    </div>
  );
};

export default Header;
