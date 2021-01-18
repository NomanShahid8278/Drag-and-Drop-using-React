import React, { useContext, createContext, useState } from "react";
import Api from "./user.json";

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(
    (localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user"))) ||
      null
  );
  const signin = ({ username, password }) => {
    return new Promise((resolve, reject) => {
      const currentUser = Api.users.reduce((acc, user) => {
        if (user.username === username && user.password === password) {
          return user;
        }
        return acc;
      }, null);

      if (currentUser) {
        localStorage.setItem("user", JSON.stringify(currentUser));
        setUser(currentUser);
        resolve(currentUser);
      } else {
        reject("username or password is incorrect");
      }
    });
  };

  const signout = (cb) => {
    return new Promise((resolve, reject) => {
      setUser("");
      localStorage.setItem("user", "");
      resolve();
    });
  };

  return {
    user,
    setUser,
    signin,
    signout,
  };
}

export { useAuth, useProvideAuth, ProvideAuth };
