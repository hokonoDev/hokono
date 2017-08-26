import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalPetFeed } from '../components/index';

const GuestRouter = (props) => (
  <div>
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
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    gPets: state.gPets,
  };
}

export default connect(mapStateToProps)(GuestRouter);
