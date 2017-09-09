import React from 'react';
import { Route, Link } from 'react-router-dom';
import { sortUsersPetsAction } from '../actions/PetsActions';
import {
  FilterBar,
  PetList,
  IfRedirect,
  FollowingList,
  AdoptRequestList,
  MessagesList,
  // IfRender,
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

    <div
      className="dash-header"
    >
      <div
        className="left"
      >
        <p>Dashboard</p>
      </div>
      <div
        className="right"
      >
        <p>{props.profile.displayName}</p>
        <img
          src={props.profile.profPic}
          alt=""
        />
      </div>
    </div>
    <div
      className="stats-box"
    >
      <Link
        to={`${props.match.url}/following`}
      >
        <div>
          Following: {props.profile.followingCount ? props.profile.followingCount : '0'}
        </div>
      </Link>
      <Link
        to={`${props.match.url}`}
      >
        <div>
          Starred: {props.profile.myStars ? Object.keys(props.profile.myStars).length : '0'}
        </div>
      </Link>
      <Link
        to={`${props.match.url}`}
      >
        <div>
          Liked: {props.profile.myPostLikes ? Object.keys(props.profile.myPostLikes).length : '0'}
        </div>
      </Link>
    </div>
    <div
      className="pets-box"
    >
      <p
        className="title"
      >{props.petData ? 'Your Pets' : null}</p>
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
    </div>
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
      <Route
        exact path={`${props.match.path}/messages`}
        render={renderProps=> (
          <MessagesList
            {...renderProps}
            chat={props.chat}
            auth={props.auth}
          />
        )}
      />
  </div>
);
