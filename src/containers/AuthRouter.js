import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../firebase/index';
import { signinAction } from '../actions/AuthActions';
import {
  Login,
  Signup,
  AuthNav,
  IfRedirect,
  ProfileInit,
  } from '../components/index';

const AuthRouter = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupError: '',
      loginError: '',
    };

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup(email, password) {
    this.state.signupError = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => this.setState({ signupError: err }))
      .then(() => {
        if(!this.state.signupError) {
          this.setState({ signupError: { message: 'Success' }});
          signinAction();
        }
      });
  }

  login(email, password) {
    this.state.loginError = '';
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        this.setState({ loginError: err })
      })
      .then(() => {
        if(!this.state.loginError) {
          this.setState({ loginError: { message: 'Success' }});
          signinAction();
        }
      });
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.loggedIn}
          ifTrue="/auth/init"
        />
        <AuthNav {...this.props} />
        <Route
          path={`${this.props.match.path}/login`}
          render={renderProps => (
            <Login
              {...renderProps}
              login={this.login}
              error={this.state.loginError}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/signup`}
          render={renderProps => (
            <Signup
              {...renderProps}
              signup={this.signup}
              error={this.state.signupError}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/init`}
          render={renderProps => (
            <ProfileInit
              {...renderProps}
              auth={this.props.auth}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AuthRouter);
