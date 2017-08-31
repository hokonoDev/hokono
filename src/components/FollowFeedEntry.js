import React from 'react';
import { likePostAction, unlikePostAction } from '../actions/PostsActions';

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
    {console.log(props)}
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
            if (!!props.post.likedBy ? !props.post.likedBy[props.auth.uid] : true) {
              likePostAction(props.postId, props.post.petId, props.post.ownerUid);
            } else {
              unlikePostAction(props.postId, props.post.petId, props.post.ownerUid);
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
          src={!!props.post.likedBy ? !!props.post.likedBy[props.auth.uid] ? '/images/full-heart.png' : '/images/heart.png' : '/images/heart.png'}
          alt=""
        />
      </button>
    </div>
    <p>Likes: {props.post.likes}</p>
    <p>{props.post.description}</p>
  </div>
);

export default PetPost;
