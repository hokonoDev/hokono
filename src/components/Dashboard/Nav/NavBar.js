import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <Link to={`/profile`}>My Shelter Profile</Link>
    <Link to={`/addPet`}>Add Pet</Link>
  </div>
);