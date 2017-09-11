import React from 'react';
import { signoutAction } from '../actions/AuthActions';
import { Link } from 'react-router-dom';

export default props => (
  <div
    className="row-box-center"
  >
    <Link to="/">
      <div
        className="logo-box"
      >
        <img
          className="logo"
          src="/images/hokono-logo-v1.0.png"
          alt=""
        />
      </div>
    </Link>
    {
      props.auth.loggedIn ?
        <button
          className="logout-bttn"
          onClick={signoutAction}
        >Logout</button> :
        null
    }
  </div>
)
