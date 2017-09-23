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
import { getDisplayNameFromUid } from './lib/helpers';

const PetProfile = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {},
    }
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
    if(this.state.pet.ownerUid && prevState.pet.ownerUid !== this.state.pet.ownerUid) {
      getDisplayNameFromUid(this.state.pet.ownerUid)
      .then(name => this.setState({ pet: { ...this.state.pet, ownerName: name }}));
    }
  }

  setPetData() {
    if (this.props.pet.petPromise){
      this.props.pet.petPromise
        .then(item =>
          this.setState({ pet: { ...item.val() }})
        );
    } else {
      this.setState({ pet: { ...this.props.pet, ownerName: this.state.pet.ownerName } });
    }
  }

  render() {
    return (
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <h4
            className="title"
          >{this.state.pet.name}</h4>
          <div
            className="pet-profile-header"
          >
            <img
              src={this.state.pet.filePath}
              alt=""
              style={{
                height: '200px',
                width: '200px',
                imagePosition: 'center',
                objectFit: 'cover',
                border: '1px solid lightgrey',
                borderRadius: '50%',
              }}
            />
            <div
              className="pet-side-box"
            >
              <div
                className="info-box"
              >
                <Link
                  className="info"
                  to={`/${this.state.pet.adopt ? 'shelter' : 'user'}/profile/${this.state.pet.ownerUid}`}
                >
                  <img src="/images/profile.png" alt="" />
                  <p> {this.state.pet.ownerName}</p>
                </Link>
                <div
                  className="info"
                >
                  <img src="/images/star.png" alt="" />
                  <p>Starred by {this.state.pet.stars}</p>
                </div>
                <div
                  className="info"
                >
                  <img src="/images/network.svg" alt="" />
                  <p>Followed by {this.state.pet.followersCount || 0}</p>
                </div>
              </div>
              <div
                className="interaction-box"
              >
                <button
                  className="star-button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.props.auth.loggedIn) {
                      if (typeof this.props.pet.starredBy === 'undefined') {
                        userStarredPet(this.props.pet);
                        this.setState({ pet: {...this.state.pet, stars: ++this.state.pet.stars} });
                      }
                      else if (this.props.pet.starredBy[this.props.auth.uid]) {
                        userUnstarredPet(this.props.pet);
                        this.setState({ pet: {...this.state.pet, stars: --this.state.pet.stars} });
                      } else {
                        userStarredPet(this.props.pet);
                        this.setState({ pet: {...this.state.pet, stars: ++this.state.pet.stars} });
                      }
                    } else {
                      alert('Please login to star');
                    }
                  }}
                >
                  <img
                    src={this.props.pet.starredBy && this.props.pet.starredBy[this.props.auth.uid] ? '/images/full-star.png' : '/images/star.png'}
                    alt=""
                  />
                </button>
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
                          if (this.props.auth.loggedIn) {
                            if (this.props.profile.adoptRequests && this.props.profile.adoptRequests[this.state.pet.id])
                              this.props.history.push('/user/dashboard/adopt');
                            else
                              adoptRequestAction(this.props.profile.adoptRequests, this.state.pet.id, this.state.pet.ownerUid);
                          } else
                            alert('Please login to adopt');
                        }}
                      >{
                        this.props.profile.adoptRequests
                        && this.props.profile.adoptRequests[this.state.pet.id]
                        ? this.props.profile.adoptRequests[this.state.pet.id].closed ? this.props.profile.adoptRequests[this.state.pet.id].status.toUpperCase() : 'Sent!'
                        : 'Adopt Me!!!'
                      }</button>
                  }
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.props.auth.loggedIn) {
                      if(!!this.props.profile.following && !!this.props.profile.following[this.props.pet.id]) {
                        userUnfollowedPet(this.props.pet);
                        this.setState({ pet: {...this.state.pet, followersCount: --this.state.pet.followersCount} });
                      } else {
                        userFollowedPet(this.props.pet);
                        this.setState({ pet: {...this.state.pet, followersCount: ++this.state.pet.followersCount} });
                      }
                    } else {
                      alert('Please loggin to follow');
                    }
                  }}
                >
                {!!this.props.profile.following && !!this.props.profile.following[this.props.pet.id] ? 'Unfollow': 'Follow'}
                </button>
              </div>
              {
                !this.state.pet.description ? null : <p
                className="description"
                >{this.state.pet.description || ''}</p>
              }
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
            </div>
          </div>
          <PetPostList
            pet={this.state.pet}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

export default PetProfile;
