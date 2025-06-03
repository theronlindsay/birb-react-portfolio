import React, { Component } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons"

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/nomatch";
import Icons from "../helpers/icons";

export default class App extends Component {

  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }



  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    }).then(response => {
      console.log("logged_in return", response);
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      // If loggedIn and status LOGGED_IN => return data
      // If loggedIN and status NOT_LOGGED_IN => update state to LOGGED_IN
      // If !loggedIN and status LOGGED_IN => update state to NOT_LOGGED_IN

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }).catch(error => {
      console.log("Error", error);
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }
  authorizePages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" element={<PortfolioManager />} />
    ]
  }
  render() {

    return (
      <div className='container'>
        <div>
          <NavigationContainer loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} />            <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/auth" element={
              <Auth handleSuccessfulLogin={this.handleSuccessfulLogin} handleUnSuccessfulLogin={this.handleUnSuccessfulLogin} />
            } />            <Route path="/about-me" element={<About />} />
            <Route path="/blog" element={
              <Blog loggedInStatus={this.state.loggedInStatus} />
            } />
            <Route
              path="/b/:slug"
              element={
                <BlogDetail loggedInStatus={this.state.loggedInStatus} />
              }
            />

            {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizePages() : null}
            <Route path="/portfolio/:slug" element={<PortfolioDetail />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </div>
    );
  }
}
