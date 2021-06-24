import React, { Component } from 'react';
import moment from 'moment';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import PortfolioContainer from "./portfolio/portfolio-container";
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>birb's Portfolio</h1>
        <div href="time">
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </div>
          <Router>
            <div>
              <NavigationContainer />

              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about-me" component={About} />
              </Switch>
            </div>
          </Router>

          <PortfolioContainer />
      </div>
    );
  }
}
