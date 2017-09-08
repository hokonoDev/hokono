import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Chat, LogoBar } from '../components/index';
import {
  AuthRouter,
  ShelterRouter,
  GuestRouter,
  PetRouter,
  UserRouter,
  } from './index';


const App = props => (
  <Router>
    <div>
      <LogoBar
        auth={props.auth}
      />
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
        path="/global"
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
      {props.auth.loggedIn ? <Chat chatReceiver={props.chat} messages={props.chat.messages || []}/> : null }
    </div>
  </Router>
);

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
    chat: state.chat,
  };
}
export default connect(mapStateToProps)(App);
