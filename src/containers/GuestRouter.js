import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  GlobalPetFeed,
  GlobalMapView,
} from '../components/index';

const GuestRouter = (props) => (
  <div>
    {console.log(props)}
    <Route
      path="/allpets"
      render={renderProps => (
        <GlobalPetFeed
          {...renderProps}
          auth={props.auth}
          gPets={props.gPets}
        />
      )}
    />
    <Route
      path="/mapview"
      render={renderProps => (
        <GlobalMapView
          {...renderProps}
          auth={props.auth}
          userLocation={props.profile.location || props.profile.address}
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
