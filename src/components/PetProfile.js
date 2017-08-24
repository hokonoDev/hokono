import React from 'react';
import PetPostList from './PetProfile/PetPostList.js';
import Nav from './Dashboard/Nav';

const PetProfile = (props) => {
  return (
    <div>
      <Nav
        {...this.props}
        authData={props.auth}
      />
      PetProfile
      <pre>{JSON.stringify(props.match)}</pre>
    </div>
  );
}

export default PetProfile;
