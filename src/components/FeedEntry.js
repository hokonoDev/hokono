import React from 'react';
import { Link } from 'react-router-dom'
import { userFollowedPet, userStaredPet, userUnstaredPet, userUnfollowedPet } from '../actions/UserFollowsPet';
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
      to={`pet/${props.data.id}`}
    >{props.data.name}</Link>
    <div
      style={{
        'backgroundImage': `url(${props.data.filePath})`,
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
            if(!!props.profile.following && !!props.profile.following[props.data.id]) {
              userUnfollowedPet(props.data);
            } else {
              userFollowedPet(props.data);
            }
          } else {
            alert('Please loggin to follow');
          }
        }}

      >
      {!!props.profile.following && !!props.profile.following[props.data.id] ? 'Unfollow': 'Follow'}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            if (typeof props.data.staredBy === 'undefined') {
              userStaredPet(props.data);
            }
            else if (props.data.staredBy[props.auth.uid]) {
              userUnstaredPet(props.data);
            } else {
              userStaredPet(props.data);
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
          src={props.data.staredBy && props.data.staredBy[props.auth.uid] ? '/images/full-star.png' : '/images/star.png'}
        />
      </button>
    </div>
    <p>Stars: {props.data.stars}</p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth,
  }
}
//{props.profile.following[props.data.id] ? 'Followed' : 'Follow'}
export default connect(mapStateToProps)(FeedEntry);
