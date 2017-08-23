import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <div>
      <Link to={`/profile/${props.authData.username}`}>My Shelter Profile</Link>
      <Link to={`/addPet`}>Add Pet</Link>
    </div>
  );
}

export default Nav;
