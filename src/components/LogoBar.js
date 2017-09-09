import React from 'react';
import { signoutAction } from '../actions/AuthActions';

export default props => (
  <div>
  <div
    className="logo-bar-filler"
  >
  </div>
  <div
    className="row-box-center"
  >
    <div
      className="logo-box"
    >
      <img
        className="logo"
        src="/images/hokono-logo-v1.0.png"
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
  </div>
)
