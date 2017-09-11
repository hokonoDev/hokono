import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPets } from '../actions/GlobalPetsActions';
import { updateFromDBAction } from '../actions/ShelterProfileActions';
import { fetchFollowingPostsAction } from '../actions/PostsActions';

const Nav = (props) => {
  return (
    <div>
      <div
        className="nav-filler"
      >
      {props.auth.loggedIn ?
        (
          <div
            className="nav-background"
          >
            <div
              className="nav-box"
            >
              <Link
                to={`/${props.profile.acctType}/dashboard`}
                onClick={updateFromDBAction}
              >
                <img
                  className="nav-item"
                  src="/images/home.png"
                  alt=""
                  title="Home"
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
                  className="nav-item"
                  src="/images/pets.png"
                  alt=""
                  title="Following Feed"
                />
              </Link>
              <Link to={`/${props.profile.acctType}/addPet`}>
                <img
                  className="nav-item"
                  src="/images/plus-button.png"
                  alt=""
                  title="Add A Pet"
                />
              </Link>
              <Link to={`/${props.profile.acctType}/profile/${props.auth.uid}`}>
                <img
                  className="nav-item"
                  src="/images/profile.png"
                  alt=""
                  title="My Profile"
                />
              </Link>
              <Link
                to={`/global/allpets`}
                onClick={getAllPets}
              >
                <img
                  className="nav-item"
                  src="/images/magnifier.png"
                  alt=""
                  title="Global Feed"
                />
              </Link>
              <Link
                to={`/global/mapview`}
                onClick={updateFromDBAction}
              >
                <img
                  className="nav-item"
                  src="/images/map.png"
                  alt=""
                  title="Map Search"
                />
              </Link>
              <Link
                to={`/${props.profile.acctType}/dashboard/messages`}
              >
                <img
                  className="nav-item"
                  src="/images/chatbubble.png"
                  alt=""
                  title="My Chats"
                />
              </Link>
            </div>
          </div>
        ) :
        (
          <div
            className="nav-background"
          >
            <div
              className="nav-box"
            >
              <Link to={`/`}>
                  <img
                    className="nav-item"
                    src="/images/home.png"
                    alt=""
                  />
              </Link>
              <Link
                to={`/global/allpets`}
                onClick={getAllPets}
              >
                <img
                  className="nav-item"
                  src="/images/magnifier.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
        )}
      </div>
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
