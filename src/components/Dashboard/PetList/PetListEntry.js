import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//link to single petpage
const PetListEntry = ({name, id, imgUrl, link, onClick}) => {
  return (
    <Link to={`/pet/${id}`}>
      <div onClick={onClick}>
        <div>{name}</div>
        <img src={imgUrl}/>
      </div>
    </Link>
  );
};

PetListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.num.isRequired,
  imgUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PetListEntry;