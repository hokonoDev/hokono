import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home } from '../components/index';
import {
  AuthRouter,
  ShelterRouter,
  GuestRouter,
  } from './index';


const App = props => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={renderProps => (
          <Home
            auth={props.auth}
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
