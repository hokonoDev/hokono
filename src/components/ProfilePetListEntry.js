import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PetListEntry = props => {
  return (
    <div>
      <Link to={`/pet/${props.id}/profile`}>
        <div>{props.name}</div>
        <img
          src={props.imgUrl}
          alt=""
          style={{
            height: '200px',
            width: '200px',
            imagePosition: 'center',
            objectFit: 'cover',
          }}
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
