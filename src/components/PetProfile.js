import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  PetPostList,
  IfRender,
  EditPet,
} from './index';
import {
    userFollowedPet,
    userStarredPet,
    userUnstarredPet,
    userUnfollowedPet
} from '../actions/UserFollowsPet';
import { fetchPostsByPetIdAction } from '../actions/PostsActions'
import { adoptRequestAction } from '../actions/ShelterProfileActions';

const PetProfile = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {},
    }
    console.log(props)
  }

  componentWillMount() {
    fetchPostsByPetIdAction(this.props.match.params.id);
  }

  componentDidMount() {
    this.setPetData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.pet) !== JSON.stringify(this.props.pet)){
      this.setPetData();
    }
  }

  setPetData() {
    if (this.props.pet.petPromise){
      this.props.pet.petPromise
        .then(item =>
          this.setState({ pet: { ...item.val() }})
        );
    } else {
      this.setState({ pet: this.props.pet });
    }
  }

  render() {
    return (
      <div>
        <h4>{this.state.pet.name}</h4>
        <img
          src={this.state.pet.filePath}
          alt=""
          style={{
            height: '200px',
            width: '200px',
            imagePosition: 'center',
            objectFit: 'contain',
          }}
        />
        <IfRender
          if={this.state.pet.ownerUid === this.props.auth.uid}
          ifTrue={() =>
            <Link
              to={`${this.props.match.url}/edit`}
            >
              <button>Edit</button>
            </Link>
          }
        />
        <IfRender
          if={
            this.state.pet.ownerUid !== this.props.auth.uid
            && this.state.pet.adopt
            && this.props.profile.acctType !== 'shelter'}
          ifTrue={() =>
              <button
                onClick={() => {
                  this.props.auth.loggedIn ?
                    this.props.profile.adoptRequests
                    && this.props.profile.adoptRequests[this.state.pet.id] ?
                      alert('Your request has been sent!') :
                      adoptRequestAction(this.props.profile.adoptRequests, this.state.pet.id, this.state.pet.ownerUid) :
                    alert('Please login to adopt');
                }}
              >{
                this.props.profile.adoptRequests
                && this.props.profile.adoptRequests[this.state.pet.id]
                ? 'Sent!'
                : 'Adopt Me!!!'
              }</button>
          }
        />
        <Route
          exact
          path={`${this.props.match.path}/edit`}
          render={routerProps => (
            <EditPet
              {...routerProps}
              auth={this.props.auth}
              pet={this.state.pet}
            />
          )}
        />
        <p>{this.state.pet.description || ''}</p>
        <p>Stars: {this.state.pet.stars}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (this.props.auth.loggedIn) {
              if (typeof this.props.pet.starredBy === 'undefined') {
                userStarredPet(this.props.pet);
              }
              else if (this.props.pet.starredBy[this.props.auth.uid]) {
                userUnstarredPet(this.props.pet);
              } else {
                userStarredPet(this.props.pet);
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
            src={this.props.pet.starredBy && this.props.pet.starredBy[this.props.auth.uid] ? '/images/full-star.png' : '/images/star.png'}
          />
        </button>
        <p>Followers: {this.state.pet.followersCount || 0}</p>
        <button
          style={{
              width: '60px',
              height: '20px',
          }}
          onClick={(e) => {
            e.preventDefault();
            if (this.props.auth.loggedIn) {
              if(!!this.props.profile.following && !!this.props.profile.following[this.props.pet.id]) {
                userUnfollowedPet(this.props.pet);
              } else {
                userFollowedPet(this.props.pet);
              }
            } else {
              alert('Please loggin to follow');
            }
          }}
        >
        {!!this.props.profile.following && !!this.props.profile.following[this.props.pet.id] ? 'Unfollow': 'Follow'}
        </button>
        <PetPostList
          pet={this.state.pet}
          auth={this.props.auth}
        />
      </div>
    );
  }
}

export default PetProfile;
