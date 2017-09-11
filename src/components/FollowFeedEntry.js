import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
import { likePostAction, unlikePostAction } from '../actions/PostsActions';
const { FacebookShareButton } = ShareButtons;
const { FacebookShareCount } = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');

const PetPost = props => (
  <div
    className="post-feed-entry-box"
  >
    <Link
      to={`/pet/${props.post.petId}/post/${props.postId}`}
    >
      <img
        src={props.post.image}
        alt=""
        className="post-feed-entry-img"
      />
    </Link>
    <p
      className="likes-count"
    >Liked by {props.post.likes}</p>
    <div
      className="interactions-box"
    >
      <button
        className="like-buttton"
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
          src={!!props.post.likedBy ? !!props.post.likedBy[props.auth.uid] ? '/images/full-heart.png' : '/images/heart.png' : '/images/heart.png'}
          alt=""
        />
      </button>
      <FacebookShareButton
        className="share-button"
        url={`localhost:3000/${props.petId}/post/${props.postId}`}
        title={props.name}
        description={props.post.description}
      >
        <FacebookIcon size={32} round/>
      </FacebookShareButton>
    </div>
    <p
      className="description"
    >{props.post.description}</p>
  </div>
);

export default PetPost;
