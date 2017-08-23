import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//link to single petpage
const PetListEntry = ({name, id, imgUrl}) => {
  return (
    <Link to={`/pet/${id}`}>
      <div>
        <div>{name}</div>
        <img src={imgUrl}/>
      </div>
    </Link>
  );
};

PetListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default PetListEntry;
