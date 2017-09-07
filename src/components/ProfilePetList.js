import React from 'react';
import { ProfilePetListEntry } from './index';
import PropTypes from 'prop-types';
import _ from 'lodash';

//a list of redirect links to petprofile /pet/:id
//url is an image of the pet
//link is the redirect to the pet's profile page
const PetList = ({petData}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {Object.keys(petData).length>0 ? Object.values(petData).filter(data => !!data.name).map(data => (
        <ProfilePetListEntry
          key={_.uniqueId()}
          name={data.name}
          id={data.id}
          imgUrl={data.filePath}
        />
      )): null}
    </div>
  );
}

PetList.propTypes = {
  petData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default PetList;
