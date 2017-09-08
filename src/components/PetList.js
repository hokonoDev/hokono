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
      {Object.keys(petData).length>0 ? Object.values(petData).filter(data => !!data.name).map(data => (
        <PetListEntry
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
