import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import firebase from '../firebase/index';
import {
  PetProfile,
  Nav,
  AddPetPost,
  PetPost,
  } from '../components/index';

const getPetDataPromise = (id) => {
  return firebase.database().ref(`/pets/${id}`).once('value');
}

const getPetData = ({ location, pets, gPets }) => {
  const petId = parsePath(location.pathname)[2];
  let petData = pets[petId];
  petData = petData || gPets[petId];
  return petData ? petData : { petPromise: getPetDataPromise(petId) };
}

const getPetPostPromise = (id, postId) => {
  return firebase.database().ref(`/pets/${id}/posts/${postId}`).once('value');
}

const getPostData = ({location, pets, gPets}) => {
  const petId = parsePath(location.pathname)[2];
  const postId = parsePath(location.pathname)[4];
  let petData = pets[petId];
  petData = petData || gPets[petId];
  let postIdData = petData[postId]; //these lines check if the pet data for the post we are navigating to already exists in redux
  return postId ? postIdData : { petPromise: getPetPostPromise(petId, postId) }; //else we make an api call and return a promise to the rendered post promise
}

const parsePath = (path) => {
  return path.split('/');
}

const ShelterRouter = (props) => (
  <div>
    <Nav />
    <Route
      exact
      path="/pet/:id/newpost"
      render={routerProps => (
        <AddPetPost
          {...routerProps}
          pet={getPetData(props)}
          auth={props.auth}
        />
      )}
    />
    <Route
      path="/pet/:id/profile"
      render={routerProps => (
        <PetProfile
          {...routerProps}
          pet={getPetData(props)}
          auth={props.auth}
          profile={props.profile}
        />
      )}
    />
  </div>
);

const petPostRouter = (props) => (
  <div>
    <Nav />
    <Route
      exact
      path="/pet/:id/post/:postid"
      render={routerProps => (
        <PetPost
          {...routerProps}
          post={getPostData(props)}
          postId={parsePath(props.location.pathname)[4]}
          auth={props.auth}
          petId={parsePath(props.location.pathname)[2]}
        />
      )}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    gPets: state.gPets,
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(ShelterRouter);
