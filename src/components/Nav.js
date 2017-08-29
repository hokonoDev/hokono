import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IfRender } from './index';
import { getAllPets } from '../actions/GlobalPetsActions';
import { updateFromDBAction } from '../actions/ShelterProfileActions';

const Nav = (props) => {
  const imgStyle = {
    width: '20px',
    height: '20px',
    margin: '20px',
  };
  const barStyle = {
    width: '100%',
    display: 'flex',
    'justifyContent': 'space-around',
  };
  return (
    <div style={barStyle}>
      <IfRender
        if={props.auth.loggedIn}
        ifTrue={() => (
          <div>
            <Link
              to={`/${props.profile.acctType}/dashboard`}
              onClick={updateFromDBAction}
            >
              <img
                style={imgStyle}
                src="/images/home.png"
                alt=""
              />
            </Link>
            <Link to={`/${props.profile.acctType}/addPet`}>
              <img
                style={imgStyle}
                src="/images/plus-button.png"
                alt=""
              />
            </Link>
            <Link to={`/${props.profile.acctType}/profile/${props.auth.uid}`}>
              <img
                style={imgStyle}
                src="/images/profile.png"
                alt=""
              />
            </Link>
            <Link
              to={`/allpets`}
              onClick={getAllPets}
            >
              <img
                style={imgStyle}
                src="/images/magnifier.png"
                alt=""
              />
            </Link>
          </div>
        )}
        ifFalse={() => (
          <Link to={`/`}>
              <img
                style={imgStyle}
                src="/images/home.png"
                alt=""
              />
          </Link>
        )}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pets: state.pets,
    auth: state.auth,
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Nav);
