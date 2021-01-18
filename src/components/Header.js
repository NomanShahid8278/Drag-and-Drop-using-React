import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Header = ({ signout }) => {
  let history = useHistory();

  return (
    <header className="header">
      <h1 className="logo">
        <a href="/">Assignment</a>
      </h1>
      <ul className="main-nav">
        <li>
          <img src="https://source.unsplash.com/random" alt="user" />
        </li>
        <li>
          <button
            href="#"
            onClick={() => {
              signout().then(() => {
                history.push("/login");
              });
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
