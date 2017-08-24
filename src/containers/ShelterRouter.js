import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
  Dashboard,
  PetProfile,
  AddPet,
  ShelterProfile,
  Nav,
  IfRedirect,
  } from '../components/index';



const getPetData = ({ location, pets }) => {
  const petId = parsePath(location.pathname)[3];
  return pets.filter(pet => pet.id === petId)[0];
}

const getProfileData = ({ location, auth, profile }) => {
  const profileId = parsePath(location.pathname)[3];
  return auth.username === profileId ? {...profile, owner: true} : {owner: false};
}

const parsePath = (path) => {
  return path.split('/');
}

const ShelterRouter = (props) => (
  <div>
    <IfRedirect
      if={window.location.pathname === '/shelter'}
      ifTrue="/shelter/dashboard"
    />
    <Nav/>
    <Route
      path="/shelter/dashboard"
      render={routerProps => (
        <Dashboard
          {...routerProps}
          petData={props.pets}
          auth={props.auth}
        />
      )}
    />
    <Route
      path="/shelter/pet/:id"
      render={routerProps => (
        <PetProfile
          {...routerProps}
          pet={getPetData(props)}
          auth={props.auth}
        />
      )}
    />
    <Route path="/shelter/addPet"
      render={routerProps => (
        <AddPet
          {...routerProps}
          auth={props.auth}
        />
      )}
    />
    <Route
      path="/shelter/profile/:id"
      render={routerProps => (
        <ShelterProfile
          {...routerProps}
          profile={getProfileData(props)}
          auth={props.auth}
        />
      )}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}


export default connect(mapStateToProps)(ShelterRouter);
