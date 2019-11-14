import React from "react";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Registeration from "./pages/registeration/Registeration";
import Login from "./pages/login/Login";
import * as ROUTES from "./constants/Routes";
import { PrivatePath } from "./PrivatePath";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.REGISTER} component={Registeration} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <PrivatePath path={ROUTES.DASHBOARD} component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
