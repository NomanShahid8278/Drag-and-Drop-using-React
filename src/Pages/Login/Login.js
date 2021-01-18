import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import "./style.scss";
function Login() {
  let history = useHistory();
  let auth = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = () => {
    setErrorMessage("");
    auth
      .signin({ username, password })
      .then(() => {
        history.replace("/");
      })
      .catch((e) => {
        setErrorMessage(e);
      });
  };

  const handleOnChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return auth.user ? (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  ) : (
    <div className="container">
      <div className="wrap">
        <div className="box1">
          <form action="#">
            <h1>Login</h1>
            <span>or use your account</span>
            {errorMessage ? <h1>{errorMessage}</h1> : null}
            <input
              placeholder="username"
              value={username}
              name="username"
              onChange={handleOnChange}
            />
            <input
              placeholder="password"
              type="password"
              value={password}
              name="password"
              onChange={handleOnChange}
            />
            <input
              className="button"
              onClick={login}
              type="button"
              value="Login"
            />
          </form>
        </div>
        <div className="box2">
          <div className="overlay">
            <div className="overlay-panel">
              <h1>Assignment Login Form</h1>
              <p>This login form is created for the assignment purpose.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
