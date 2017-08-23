import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard.js';
import PetProfile from '../components/PetProfile.js';
import Auth from '../components/Auth.js';
import Home from '../components/Home.js';
import AddPet from  '../components/Dashboard/Nav/AddPet.js';
import ShelterProfile from '../components/Dashboard/Nav/ShelterProfile.js';


class App extends Component {
  constructor(props) {
    super(props);
  }

  parsePath(path) {
    return path.split('/');
  }

  getPetData({ location }) {
    const petId = this.parsePath(location.pathname)[2];
    return this.props.pets.filter(pet => pet.id === petId)[0];
  }

  getProfileData({ location }) {
    const profileId = this.parsePath(location.pathname)[2];
    return this.props.auth.username === profileId ? {...this.props.profile, owner: true} : {owner: false};
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            component={Home}
          />
          <Route
            path="/dashboard"
            component={Dashboard}
          />
          <Route
            path="/auth"
            component={Auth}
          />
          <Route
            path="/pet/:id"
            render={props => (
              <PetProfile
                {...props}
                pet={this.getPetData(props)}
              />
            )}
          />
          <Route path="/addPet"
            component={AddPet}
          />
          <Route
            path="/profile/:id"
            render={props => (
              <ShelterProfile
                {...props}
                profile={this.getProfileData(props)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(App);
