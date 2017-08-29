import React from 'react';
import { PetPostList } from './index';
import { userFollowedPet, userLikedPet, userUnlikedPet } from '../actions/UserFollowsPet';

const PetProfile = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {},
    }
  }

  componentDidMount() {
    this.setPetData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.pet) !== JSON.stringify(this.props.pet)){
      this.setProfileData();
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
        <p>Likes: {this.state.pet.likes}</p>
        <p>Followers: {this.state.pet.followersCount}</p>
        <button
          style={{
              width: '60px',
              height: '20px',
          }}
          onClick={(e) => {
            e.preventDefault();
            if (this.props.auth.loggedIn) {
              userFollowedPet(this.state.pet)
            } else {
              alert('Please log in to follow');
            }
          }}
          disabled={!!this.props.profile.following && !!this.props.profile.following[this.state.pet.id]}
        >{!!this.props.profile.following && !!this.props.profile.following[this.state.pet.id] ? 'Followed': 'Follow'}
        </button>
        <pre>{JSON.stringify(this.state.pet)}</pre>
        <PetPostList />
      </div>
    );
  }
}

export default PetProfile;
