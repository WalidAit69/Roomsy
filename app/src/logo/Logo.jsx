import React from "react";
import logo from "../assets/door.png";
import { Link } from "react-router-dom";
import "./logo.css";


function Logo() {
  return (
    <Link to={"/"} className="logo">
      <img src={logo} alt="logo" className="logo_img" />
      <span className="logo_name">
        Roomsy<span>TM</span>
      </span>
    </Link>
  );
}

export default Logo;
