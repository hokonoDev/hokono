import React from 'react';
import PetPostList from './PetProfile/PetPostList.js';
const PetProfile = (props) => {
  return (
    <div>
      PetProfile
      <pre>{JSON.stringify(props.pet)}</pre>
    </div>
  );
}

export default PetProfile;
