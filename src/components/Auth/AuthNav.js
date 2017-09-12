import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPets } from '../../actions/GlobalPetsActions';

export default (props) => (
  <div
    className="nav-filler"
  >
    <div
      className="nav-background"
    >
      <div
        className="nav-box"
      >
        <Link
          className="nav-text-item"
          to={`/auth/login`}
        >Login</Link>
        <Link
          className="nav-text-item"
          to={`/auth/signup`}
        >Sign Up</Link>
        <Link
          className="nav-text-item"
          to={`/global/allpets`}
          onClick={getAllPets}
        >Guest</Link>
      </div>
    </div>
  </div>
);
