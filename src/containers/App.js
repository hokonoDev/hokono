import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard } from '../components/index';
import { PetProfile } from '../components/index';
import { Auth } from '../components/index';
import { Home } from '../components/index';
import { AddPet } from '../components/index';
import { ShelterProfile } from '../components/index';


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
            render={renderProps =>
              <Auth
                {...renderProps}
                loggedIn={this.props.auth.loggedIn}
                dispatch={this.props.dispatch}
              />
            }
          />
          <Route
            path="/pet/:id"
            render={props => (
              <PetProfile
                {...props}
                pet={this.getPetData(props)}
                auth={this.props.auth}
              />
            )}
          />
          <Route path="/addPet"
            render={props => (
              <AddPet
                {...props}
                auth={this.props.auth}
              />
            )}
          />
          <Route
            path="/profile/:id"
            render={props => (
              <ShelterProfile
                {...props}
                profile={this.getProfileData(props)}
                auth={this.props.auth}
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
