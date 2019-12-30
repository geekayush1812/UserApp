import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import showUser from "./components/show-user.component";
import editUser from "./components/edit-user.component";
import registerUser from "./components/register-user.component";

import logo from "./logo.svg";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={logo} width="30" height="30" alt="logo" />
            </a>
            <Link to="/" className="navbar-brand">
              UserApp
            </Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Show Users
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={showUser} />
          <Route path="/edit/:id" component={editUser} />
          <Route path="/create" component={registerUser} />
        </div>
      </Router>
    );
  }
}

export default App;
