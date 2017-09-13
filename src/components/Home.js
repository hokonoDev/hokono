import React from 'react';
import { Link } from 'react-router-dom';
import {
  IfRender,
  IfRedirect
} from './index';
import { getAllPets } from '../actions/GlobalPetsActions';
import { setDisplayNameUndefined } from '../actions/AuthActions';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gif: 1 + Math.floor(Math.random() * 10)
    }
  }
  // accounts for first time login with facebook

  componentDidMount() {
    this.gifInterval = setInterval(() => this.getGifNumber(), 4000);
  }

  getGifNumber() {
    this.setState({ gif: 1 + Math.floor(Math.random() * 20) });
  }

  componentDidUpdate () {
    if (this.props.auth.loggedIn) {
      if (this.props.profile.got && !this.props.profile.acctType) {
        setDisplayNameUndefined();
        this.props.history.push('/auth/init');
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.gifInterval);
  }

  render () {
    return (
      <div
        className="home-box"
      >
        <img
          src={`/images/home-gif-${this.state.gif}.gif`}
          alt=""
        />
        <IfRedirect
          if={this.props.profile.acctType && this.props.profile.acctType === 'user'}
          ifTrue="/user/dashboard"
        />
        <IfRedirect
          if={this.props.profile.acctType && this.props.profile.acctType === 'shelter'}
          ifTrue="/shelter/dashboard"
        />
      </div>
    );
  }
}

export default Home;
