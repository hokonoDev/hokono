import React from 'react';
import { Route } from 'react-router-dom';
import { signoutAction } from '../actions/AuthActions';
import { sortUsersPetsAction } from '../actions/PetsActions';
import {
  FilterBar,
  PetList,
  IfRedirect
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
      <pre>Auth: { JSON.stringify(props.auth) }</pre>
  </div>
);
