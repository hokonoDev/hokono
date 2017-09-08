import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../firebase/index';
import fb from 'firebase';

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
    this.fblogin = this.fblogin.bind(this);
  }

  signup(email, password) {
    this.setState({ signupError: '' });
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
    this.setState({ loginError: '' });
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

  fblogin () {
    var provider = new fb.auth.FacebookAuthProvider();
    provider.addScope('email');
    this.setState({ loginError: '' });
    fb.auth().setPersistence(fb.auth.Auth.Persistence.SESSION).then(() => {
      fb.auth().signInWithPopup(provider).then((result)=> {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // var user = result.user;
        if(!this.state.loginError) {
          this.setState({ loginError: { message: 'Success' }});
          signinAction();
        }
      }).catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
      });
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
              fblogin={this.fblogin}
              error={this.state.loginError}
            />
          )}
        />
        <div id="fb-root"></div>
          <script>{(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=127121794596439";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'))}
          </script>
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
