import React from 'react';
import { PetListEntry } from './index';
import PropTypes from 'prop-types';
import _ from 'lodash';

//a list of redirect links to petprofile /pet/:id
//url is an image of the pet
//link is the redirect to the pet's profile page
const PetList = ({petData}) => {
  return (
    <div
      className="wrap-row-box-center"
    >
      {Object.keys(petData).length > 1 ? Object.values(petData).filter(data => !!data.name).map(data => (
        <PetListEntry
          key={_.uniqueId()}
          name={data.name}
          id={data.id}
          imgUrl={data.filePath}
        />
      )): <p>You haven't added any pets yet!</p>}
    </div>
  );
}

export default PetList;
