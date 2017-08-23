import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.js';
import PetProfile from '../components/PetProfile.js';
import Auth from '../components/Auth.js';
import Home from '../components/Home.js';


class App extends Component {
  constructor(props) {
    super(props);
  }

  getPetData({ location }) {
    const petId = location.pathname.slice(5);
    return this.props.pets.filter(pet => pet.id === petId)[0];
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/pet/:id" render={props => (
              <PetProfile
                {...props}
                pet={this.getPetData(props)}
              />
          )}/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { pets: state.pets };
}

export default connect(mapStateToProps)(App);
