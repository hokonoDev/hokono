import React from 'react';
import PetListEntry from './PetList/PetListEntry.js';
import PropTypes from 'prop-types';

//a list of redirect links to petprofile /pet/:id
//url is an image of the pet
//link is the redirect to the pet's profile page
const PetList = ({petData, onPetClick}) => {
  return (
    <div>
      {petData.map(data => (
        <PetListEntry name={data.name} id={data.id} imgUrl={data.url} link={data.link} onClick={() => onPetClick(data.link)}/>
      ))}
    </div>
  );
}

PetList.propTypes = {
  petData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.num.isRequired,
    }).isRequired
  ).isRequired,
  onPetClick: PropTypes.func.isRequired
};

export default PetList;