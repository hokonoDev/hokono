import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PetListEntry = props => {
  return (
    <div
      className="pet-list-entry-box"
    >
      <Link
        className="pet-list-name"
        to={`/pet/${props.id}/profile`}
      >
        <p>{props.name}</p>
      </Link>
      <img
        className="pet-list-pic"
        src={props.imgUrl}
        alt=""
      />
      <Link
        className="add-post-link"
        to={`/pet/${props.id}/newpost`}
      >
        <img
          src="/images/plus-button.png"
          alt=""
        />
      </Link>
    </div>
  );
};

PetListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
};

export default PetListEntry;
