import React from 'react';
import PetListEntry from './PetList/PetListEntry.js';

//a list of redirect links to petprofile /pet/:id
const PetList = ({petlinks, onPetClick}) => {
  return (
    <div>
      {petlinks.map(link => (
        <PetListEntry link={link} onClick={() => onPetClick(link)}/>
      ))}
    <div>
  );
}

export default PetList;