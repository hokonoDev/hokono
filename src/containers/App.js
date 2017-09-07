import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Home, Chat } from '../components/index';
import {
  AuthRouter,
  ShelterRouter,
  GuestRouter,
  PetRouter,
  UserRouter,
  } from './index';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    }
    this.toggleChat = this.toggleChat.bind(this);
  }

  toggleChat(e) {
    e.preventDefault();
    this.setState({toggled: !this.state.toggled});

  }
  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={renderProps => (
              <Home
                {...renderProps}
                auth={this.props.auth}
                profile={this.props.profile}
              />
            )}
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
        </div>
      </Router>
    )
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
