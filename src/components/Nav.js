import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const imgStyle = {
    width: '20px',
    height: '20px',
    margin: '20px',
  };
  const barStyle = {
    width: '100%',
    display: 'flex',
    'justify-content': 'space-around',
  };
  return (
    <div style={barStyle}>
      <Link to={`/dashboard`}>
        <img
          style={imgStyle}
          src="/images/home.png"
        />
      </Link>
      <Link to={`/addPet`}>
        <img
          style={imgStyle}
          src="/images/plus-button.png"
        />
      </Link>
      <Link to={`/profile/${props.authData.username}`}>
        <img
          style={imgStyle}
          src="/images/profile.png"
        />
      </Link>
    </div>
  );
}

export default Nav;
