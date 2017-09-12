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
  <div
    className="col-box-center"
  >


    <IfRedirect
      if={props.auth.displayName}
      ifFalse={`/auth/init`}
    />
    <IfRedirect
      if={props.auth.loggedIn}
      ifFalse="/auth/login"
    />


    {
      props.location.pathname === '/shelter/dashboard/messages' || props.location.pathname === '/user/dashboard/messages' ? null :
      <div
          className="dash-header"
        >
          <div
            className="left"
          >
            <p>{props.profile.displayName}</p>
            <img
              src={props.profile.profPic}
              alt=""
            />
          </div>
          <div
            className="right"
          >
            <Link
              to={`${props.match.url}/following`}
            >
              <div>
                Following: {props.profile.followingCount ? props.profile.followingCount : '0'}
              </div>
            </Link>
            <Link
              to={`${props.location.pathname}`}
            >
              <div>
                Starred: {props.profile.myStars ? Object.keys(props.profile.myStars).length : '0'}
              </div>
            </Link>
            <Link
              to={`${props.match.url}/adopt`}
            >
              <div>
                Requests: {props.profile.adoptRequests ? Object.keys(props.profile.adoptRequests).length : '0'}
              </div>
            </Link>
          </div>
        </div>
      }




    <div
      className="pets-box"
    >
      {
        props.location.pathname === props.match.path ?
          <p className="title">Your Pets</p> : null
      }
      <Route
        exact path={`${props.match.path}`}
        render={renderProps => Object.keys(props.petData).length > 1 ? (
          <FilterBar
            filter={props.petData.sort}
            sortAction={sortUsersPetsAction}
            searchBar={true}
          />
        ) : null}
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
    </div>


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
