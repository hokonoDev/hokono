import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <Link to={`${props.match.path}/login`}>Login</Link>
    <Link to={`${props.match.path}/signup`}>Sign Up</Link>
  </div>
);
