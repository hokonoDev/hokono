import React from 'react';
import { Link } from 'react-router-dom'
import { userFollowedPet, userStarredPet, userUnstarredPet, userUnfollowedPet } from '../actions/UserFollowsPet';
import { connect } from 'react-redux';

const FeedEntry = (props) => (
  <div
    style={{
      height: '400px',
      width: '350px',
      border: '0px solid black',
      margin: '20px',
      'boxShadow': '2px 2px 2px lightgrey',
      'backgroundColor': 'whitesmoke',
      display: 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
    }}
  >
    <Link
      to={`/pet/${props.pet.id}/profile`}
    >{props.pet.name}</Link>
    <div
      style={{
        'backgroundImage': `url(${props.pet.filePath})`,
        width: '300px',
        height: '200px',
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'center',
      }}
    />
    <div>
      <button
        style={{
            width: '60px',
            height: '20px',
        }}
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            if(!!props.profile.following && !!props.profile.following[props.pet.id]) {
              userUnfollowedPet(props.pet);
            } else {
              userFollowedPet(props.pet);
            }
          } else {
            alert('Please loggin to follow');
          }
        }}

      >
      {!!props.profile.following && !!props.profile.following[props.pet.id] ? 'Unfollow': 'Follow'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            if (typeof props.pet.starredBy === 'undefined') {
              userStarredPet(props.pet);
            }
            else if (props.pet.starredBy[props.auth.uid]) {
              userUnstarredPet(props.pet);
            } else {
              userStarredPet(props.pet);
            }
          } else {
            alert('Please login to star');
          }
        }}
      >
        <img
          style={{
            width: '20px',
            height: '20px',
          }}
          src={props.pet.starredBy && props.pet.starredBy[props.auth.uid] ? '/images/full-star.png' : '/images/star.png'}
        />
      </button>
    </div>
    <p>Stars: {props.pet.stars}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  }
}
//{props.profile.following[props.pet.id] ? 'Followed' : 'Follow'}
export default connect(mapStateToProps)(FeedEntry);
