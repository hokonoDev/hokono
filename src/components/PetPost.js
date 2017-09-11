import React from 'react';
import { Link } from 'react-router-dom';
import { likePostAction, unlikePostAction } from '../actions/PostsActions';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
const { FacebookShareButton } = ShareButtons;
const { FacebookShareCount } = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');

export default class PetPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petId: this.props.petId,
      post: this.props.post ,
      name: this.props.name ,
      ownerId: this.props.ownerId,
      auth: this.props.auth,
      postId: this.props.postId,
      key: this.props.keySS,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.setPetPost();
  }

  setPetPost() {
    if (this.props.post.petPromise) {
      this.props.post.petPromise.then(pData => {
        this.setState({
          post: pData.val(),
          ownerId: pData.val().ownerUid,
          name: pData.val().name,
        });
      });
    } else {
      this.setState({post: this.props.post})
    }
  }
  render() {
    return (
      <div
       className="post-feed-entry-box"
      >
        <Link to={`/pet/${this.state.petId}/post/${this.state.postId}`}>
            {console.log(this.state.name)}
            {this.state.name}
        </Link>
        <img
          src={this.props.post.image}
          alt=""
          className="post-feed-entry-img"
        />
        <p
          className="likes-count"
        >Liked by {this.props.post.likes}</p>
        <div
          className="interactions-box"
        >
          <button
            className="like-buttton"
            onClick={(e) => {
              e.preventDefault();
              if (this.state.auth.loggedIn) {
                if (!!this.state.post.likedBy ? !this.state.post.likedBy[this.state.auth.uid] : true) {
                  likePostAction(this.state.postId, this.state.petId, this.state.ownerId);
                } else {
                  unlikePostAction(this.state.postId, this.state.petId, this.state.ownerId);
                }
              } else {
                alert('Please login to like');
              }
            }}
          >
            <img
              src={!!this.state.post.likedBy ? !!this.state.post.likedBy[this.state.auth.uid] ? '/images/full-heart.png' : '/images/heart.png' : '/images/heart.png'}
              alt=""
            />
          </button>
          <FacebookShareButton url={`localhost:3000/${this.state.petId}/post/${this.state.postId}`} title={this.state.name} description={this.state.post.description}>
            <FacebookIcon size={32} round/>
          </FacebookShareButton>
        </div>
        <p
          className="description"
        >{this.state.post.description}</p>
      </div>
    )
  }
}
