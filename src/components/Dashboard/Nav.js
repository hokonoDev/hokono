import React from 'react';
import ShelterProfile from './Nav/ShelterProfile.js';
import AddPet from './Nav/AddPet.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NavBar from './Nav/NavBar.js';

const Nav = (props) => {
  return (
      <div>
        <NavBar {...props} />
      </div>
  );
}

export default Nav;