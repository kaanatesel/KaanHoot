import React, { Component } from 'react';
import PrivateRouteQuestionPage from './Components/PriviteRoutse/questionPage';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import MainPage from './MainPage'
import Questions from './Questions.js'

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <PrivateRouteQuestionPage path="/questions" component={Questions} />
          </Switch>
        </Router>
    );
  }
}

export default App;
