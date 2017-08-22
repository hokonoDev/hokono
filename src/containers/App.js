import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from '../components/Dashboard.js';
import PetProfile from '../components/PetProfile.js';
import Auth from '../components/Auth.js';
import Home from '../components/Home.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/pet/:id" component={PetProfile}/>
        </div>
      </Router>
    );
  }
}

export default App;
