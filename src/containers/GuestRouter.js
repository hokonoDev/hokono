import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  GlobalPetFeed,
  GlobalMapView,
  Nav,
} from '../components/index';

const GuestRouter = (props) => (
  <div>
    <Nav />
    <Route
      path="/global/allpets"
      render={renderProps => (
        <GlobalPetFeed
          {...renderProps}
          auth={props.auth}
          gPets={props.gPets}
        />
      )}
    />
    <Route
      path="/global/mapview"
      render={renderProps => (
        <GlobalMapView
          {...renderProps}
          auth={props.auth}
          userLocation={props.profile.location || props.profile.address}
          gPets={props.gPets}
        />
      )}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    gPets: state.gPets,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(GuestRouter);
