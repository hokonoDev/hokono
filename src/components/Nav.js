import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPets } from '../actions/GlobalPetsActions';
import { updateFromDBAction } from '../actions/ShelterProfileActions';
import { fetchFollowingPostsAction } from '../actions/PostsActions';

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
      {props.auth.loggedIn ?
        (
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
            <Link
              to={`/${props.profile.acctType}/followfeed`}
              onClick={() => {
                updateFromDBAction()
                fetchFollowingPostsAction(props.profile.following ? Object.keys(props.profile.following) : []);
              }}
            >
              <img
                style={imgStyle}
                src="/images/pets.png"
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
              to={`/global/allpets`}
              onClick={getAllPets}
            >
              <img
                style={imgStyle}
                src="/images/magnifier.png"
                alt=""
              />
            </Link>
            <Link
              to={`/${props.profile.acctType}/dashboard/adopt`}
            >
              <img
                style={imgStyle}
                src="/images/list.png"
                alt=""
              />
            </Link>
          </div>
        ) :
        (
          <div>
            <Link to={`/`}>
                <img
                  style={imgStyle}
                  src="/images/home.png"
                  alt=""
                />
            </Link>
            <Link
              to={`/global/allpets`}
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
