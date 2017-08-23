import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import AuthNav from './Auth/AuthNav';
import firebase from '../firebase/index';
import store from '../store';

const Auth = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupError: ''
    };

    console.log(this.props.loggedIn);
    console.log(firebase.auth().currentUser);

    this.signup = this.signup.bind(this);
  }

  signup(email, password) {
    this.state.signupError = '';
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(err => this.setState({ signupError: err }))
      .then(() => {
        if(!this.state.signupError) {
          this.setState({ signupError: { message: 'success' }});
          this.dispatchSignin();
        }
      });
  }

  render() {
    return (
      <Router>
        <div>
          {
            this.props.loggedIn ?
              <Redirect
                to="/dashboard"
              />
              :
              null
          }
          <AuthNav {...this.props} />
          <Route
            path={`${this.props.match.path}/login`}
            component={Login}
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
        </div>
      </Router>
    );
  }
}

export default Auth;
