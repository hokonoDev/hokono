import React from 'react';
import { PetPostList } from './index';

const PetProfile = (props) => {
  return (
    <div>
      <h4>{props.pet.name}</h4>
      <p>Profile pic placeholder. url: {props.pet.profilePic}</p>
      <p>Likes: {props.pet.likes}</p>
      <pre>{JSON.stringify(props.pet)}</pre>
      <PetPostList />
    </div>
  );
}

export default PetProfile;
