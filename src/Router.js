import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import App from './App';
import Success from './components/Success';

export default function AppRoutes() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }