import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AuthState from "./context/auth/AuthState";
import 'semantic-ui-css/semantic.min.css'
function App() {
  return (
    <AuthState>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={"/admin"} component={Admin} />
          <Route path={"/login"} component={Login} />

          <Redirect from="/" to="/admin/home" />
        </Switch>
      </Router>
    </AuthState>
  );
}

export default App;
