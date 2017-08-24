import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dashboard } from '../components/index';
import { PetProfile } from '../components/index';
import { Home } from '../components/index';
import { AddPet } from '../components/index';
import { ShelterProfile } from '../components/index';
import { Nav } from '../components/index';
import {
  AuthRouter,
  ShelterRouter,
  } from './index';


class App extends Component {
  constructor(props) {
    super(props);
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
            path="/auth"
            render={renderProps =>
              <AuthRouter
                {...renderProps}
                loggedIn={this.props.auth.loggedIn}
                dispatch={this.props.dispatch}
              />
            }
          />
          <Route
            path="/shelter"
            component={ShelterRouter}
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
