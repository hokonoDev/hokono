import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const imgStyle = {
    width: '20px',
    height: '20px',
    margin: '20px',
};

const PetListEntry = props => {
  return (
    <div>
      <Link to={`/pet/${props.id}`}>
        <div>{props.name}</div>
      </Link>
      <img
        src={props.imgUrl}
        alt=""
        style={{
          height: '200px',
          width: '200px',
          imagePosition: 'center',
          objectFit: 'contain',
        }}
      />
      <Link
        to={`/pet/${props.id}/newpost`}
      >
        <img
          style={imgStyle}
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
