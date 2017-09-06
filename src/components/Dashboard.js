import React from 'react';
import { Route, Link } from 'react-router-dom';
import { signoutAction } from '../actions/AuthActions';
import { sortUsersPetsAction } from '../actions/PetsActions';
import {
  FilterBar,
  PetList,
  IfRedirect,
  FollowingList,
  AdoptRequestList,
} from './index';

export default props => (
  <div>
    <IfRedirect
      if={props.auth.displayName}
      ifFalse={`/auth/init`}
    />
    <IfRedirect
      if={props.auth.loggedIn}
      ifFalse="/auth/login"
    />
    {`${props.auth.displayName}'s Dashboard`}
      <button
        onClick={signoutAction}
      >
        Logout
      </button>
      <Link
        to={`${props.match.url}/following`}
      >Following: {props.profile.followingCount ? props.profile.followingCount : '0'}</Link>
      <Route
        exact path={`${props.match.path}`}
        render={renderProps => (
          <FilterBar
            filter={props.petData.sort}
            sortAction={sortUsersPetsAction}
            searchBar={true}
          />
        )}
      />
      <Route
        exact path={`${props.match.path}`}
        render={renderProps=> (
          <PetList
            petData={props.petData}
          />
        )}
      />
      <Route
        exact path={`${props.match.path}/following`}
        render={renderProps=> (
          <FollowingList
            following={props.profile.following}
          />
        )}
      />
      <Route
        exact path={`${props.match.path}/adopt`}
        render={renderProps=> (
          <AdoptRequestList
            {...renderProps}
            requests={props.profile.adoptRequests || {}}
            profile={props.profile}
          />
        )}
      />
  </div>
);
