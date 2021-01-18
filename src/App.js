import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProvideAuth } from "./AuthContext";
import { PrivateRoute } from "./components";
import { Login, Home } from "./Pages";
export default function AuthExample() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
