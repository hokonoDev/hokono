import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalPetFeed } from '../components/index';

const GuestRouter = (props) => (
  <div>
    <Route
      path="/guest/pets"
      render={renderProps => (
        <GlobalPetFeed
          {...renderProps}
          auth={props.auth}
        />
      )}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(GuestRouter);
