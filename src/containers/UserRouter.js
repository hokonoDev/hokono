import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import firebase from '../firebase/index';
import {
  Dashboard,
  AddPet,
  ShelterProfile,
  Nav,
  IfRedirect,
  FollowFeed,
  } from '../components/index';


const getPets = ({pets}) => {
  return pets;
}

const getProfilePromise = (uid) => {
  return firebase.database().ref(`/accounts/${uid}`).once('value');
}

const getProfileData = ({ location, auth, profile }) => {
  const profileId = parsePath(location.pathname)[3];
  return auth.uid === profileId ?
    {...profile, owner: true} :
    {
      profilePromise: getProfilePromise(profileId),
      owner: false,
    };
}

const parsePath = (path) => {
  return path.split('/');
}

const ShelterRouter = props => (
  <div>
    <IfRedirect
      if={window.location.pathname === '/user'}
      ifTrue="/user/dashboard"
    />
    <Nav />
    <Route
      path="/user/dashboard"
      render={routerProps => (
        <Dashboard
          {...routerProps}
          petData={getPets(props)}
          auth={props.auth}
          profile={props.profile}
        />
      )}
    />
    <Route path="/user/addPet"
      render={routerProps => (
        <AddPet
          {...routerProps}
          auth={props.auth}
          profile={props.profile}
        />
      )}
    />
    <Route
      path="/user/profile/:id"
      render={routerProps => (
        <ShelterProfile
          {...routerProps}
          profile={getProfileData(props)}
          auth={props.auth}
        />
      )}
    />
    <Route
      path="/user/followfeed"
      render={routerProps => (
        <FollowFeed
          {...routerProps}
          auth={props.auth}
          posts={props.following.posts ? props.following.posts : {}}
          sort={props.following.postsSort}
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
    following: state.following,
  };
}

export default connect(mapStateToProps)(ShelterRouter);
