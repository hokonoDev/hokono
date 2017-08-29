import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import firebase from '../firebase/index';
import {
  PetProfile,
  Nav,
  AddPetPost,
  } from '../components/index';

const getPetDataPromise = (id) => {
  return firebase.database().ref(`/pets/${id}`).once('value');
}

const getPetData = ({ location, pets }) => {
  const petId = parsePath(location.pathname)[2];
  let petData = Object.values(pets).filter(pet => pet.id === petId)[0];
  return petData ? petData : { petPromise: getPetDataPromise(petId) };
}

const parsePath = (path) => {
  return path.split('/');
}

const ShelterRouter = (props) => (
  <div>
    <Nav />
    <Route
      exact
      path="/pet/:id"
      render={routerProps => (
        <PetProfile
          {...routerProps}
          pet={getPetData(props)}
          auth={props.auth}
          profile={props.profile}
        />
      )}
    />
    <Route
      exact
      path="/pet/:id/newpost"
      render={routerProps => (
        <AddPetPost
          {...routerProps}
          pet={getPetData(props)}
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
