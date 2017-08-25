import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//link to single petpage
const PetListEntry = ({name, id, imgUrl}) => {
  return (
    <Link to={`/shelter/pet/${id}`}>
      <div>
        <div>{name}</div>
        <img src={imgUrl} alt="" />
      </div>
    </Link>
  );
};

PetListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default PetListEntry;
