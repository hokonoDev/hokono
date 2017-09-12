import React from 'react';
import { Link } from 'react-router-dom'
import { userFollowedPet, userStarredPet, userUnstarredPet, userUnfollowedPet } from '../actions/UserFollowsPet';
import { connect } from 'react-redux';

const FeedEntry = (props) => (
  <div
    className="pet-feed-entry-box"
  >
    <Link
      className="name"
      to={`/pet/${props.pet.id}/profile`}
    >{props.pet.name}</Link>
    <img
      src={props.pet.filePath}
      alt=""
      className="pet-feed-entry-img"
    />
    <p
      className="star-count"
    >Starred by {props.pet.stars}</p>
    <div
      className="interactions-box"
    >
      <button
        className="star-buttton"
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
          src={props.pet.starredBy && props.pet.starredBy[props.auth.uid] ? '/images/full-star.png' : '/images/star.png'}
        />
      </button>
      <button
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
    </div>
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
