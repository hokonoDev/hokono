import React from 'react';
import { Link } from 'react-router-dom';
import { likePostAction, unlikePostAction } from '../actions/PostsActions';

export default class PetPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petId: this.props.petId,
      post: this.props.post,
      name: this.props.name,
      ownerId: this.props.ownerId,
      auth: this.props.auth,
      postId: this.props.postId,
      key: this.props.key,
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
    }
  }
  render() {
    return (
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
          <Link to={`/pet/${this.state.petId}/post/${this.state.postId}`}>
              {this.state.name}
          </Link>
          <div
            style={{
              'backgroundImage': `url(${this.state.post.image})`,
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
                style={{
                  width: '20px',
                  height: '20px',
                }}
                src={!!this.state.post.likedBy ? !!this.state.post.likedBy[this.state.auth.uid] ? '/images/full-heart.png' : '/images/heart.png' : '/images/heart.png'}
                alt=""
              />
            </button>
          </div>
          <p>Likes: {this.state.post.likes}</p>
          <p>{this.state.post.description}</p>
        </div>
    )
  }
}

