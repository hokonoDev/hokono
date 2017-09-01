import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from '../components/index';
import {
  AuthRouter,
  ShelterRouter,
  GuestRouter,
  PetRouter,
  UserRouter
  } from './index';


const App = props => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={renderProps => (
          <Home
            {...renderProps}
            auth={props.auth}
            profile={props.profile}
          />
        )}
      />
      <Route
        path="/auth"
        render={renderProps =>
          <AuthRouter
            {...renderProps}
            loggedIn={props.auth.loggedIn}
            dispatch={props.dispatch}
          />
        }
      />
      <Route
        path="/shelter"
        component={ShelterRouter}
      />
      <Route
        path="/"
        component={GuestRouter}
      />
      <Route
        path="/pet"
        component={PetRouter}
      />
      <Route
        path='/user'
        component={UserRouter}
      />
    </div>
  </Router>
);

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(App);
