import React from 'react';
import { PetPostList } from './index';
import { Nav } from './index';

const PetProfile = (props) => {
  return (
    <div>
      PetProfile
      <pre>{JSON.stringify(props.match)}</pre>
    </div>
  );
}

export default PetProfile;
