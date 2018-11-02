import React, { Component } from 'react';
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
          <Route exact path="/questions" component={Questions} />
        </Switch>
      </Router>
    );
  }
}

export default App;
