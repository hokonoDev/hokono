import React from 'react';
import { PetPostList } from './index';

const PetProfile = (props) => {
  return (
    <div>
      PetProfile
      <pre>{JSON.stringify(props.match)}</pre>
      <PetPostList />
    </div>
  );
}

export default PetProfile;
