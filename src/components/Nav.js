import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
  Dashboard,
  PetProfile,
  AddPet,
  ShelterProfile,
  } from './index';

const Nav = (props) => {
  const imgStyle = {
    width: '20px',
    height: '20px',
    margin: '20px',
  };
  const barStyle = {
    width: '100%',
    display: 'flex',
    'justifyContent': 'space-around',
  };
  return (
    <div style={barStyle}>
      <Link to={`/shelter/dashboard`}>
        <img
          style={imgStyle}
          src="/images/home.png"
        />
      </Link>
      <Link to={`/shelter/addPet`}>
        <img
          style={imgStyle}
          src="/images/plus-button.png"
        />
      </Link>
      <Link to={`/shelter/profile/${props.auth.username}`}>
        <img
          style={imgStyle}
          src="/images/profile.png"
        />
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Nav);
