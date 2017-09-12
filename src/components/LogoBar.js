import React from 'react';
import { signoutAction } from '../actions/AuthActions';
import { Link } from 'react-router-dom';

export default props => (
  <div>
  <div
    className="logo-bar-filler"
  >
  </div>
  <Link to="/">
    <div
      className="row-box-center"
    >
      <div
        className="logo-box"
      >
        <img
          className="logo"
          src="/images/hokono-logo-v1.0.svg"
          alt=""
        />
      </div>
    {
      props.auth.loggedIn ?
        <button
          className="logout-bttn"
          onClick={signoutAction}
        >Logout</button> :
        null
    }
    </div>
   </Link>
  </div>
)
