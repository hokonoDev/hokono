import React from 'react';
import { PetPostList } from './index';

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
        <p>Profile pic placeholder. url: {this.state.pet.filePath}</p>
        <p>Likes: {this.state.pet.likes}</p>
        <pre>{JSON.stringify(this.state.pet)}</pre>
        <PetPostList />
      </div>
    );
  }
}

export default PetProfile;
