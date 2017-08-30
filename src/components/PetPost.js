import React from 'react';
import { likePostAction } from '../actions/PostsActions';

const PetPost = props => (
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
    <div
      style={{
        'backgroundImage': `url(${props.post.image})`,
        width: '300px',
        height: '200px',
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'center',
      }}
    />
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (props.auth.loggedIn) {
            if (props.post.likes ? props.post.likes[props.auth.uid] : true) {
              likePostAction(props.postId, props.petId);
            } else {
              alert('You already Liked this post');
            }
          } else {
            alert('Please login to like');
          }
        }}
      >
        <img
          style={{
            width: '20px',
            height: '20px',
          }}
          src="/images/heart.png"
          alt=""
        />
      </button>
    </div>
    <p>Likes: {props.post.likesCount}</p>
    <p>{props.post.description}</p>
  </div>
);

export default PetPost;
