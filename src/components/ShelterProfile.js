import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import EditProfile from './ShelterProfile/EditProfile';

const ShelterProfile = (props) => {
  return (
    <div>
      <div>
        {props.profile.owner ?
          'My Profile'
          :
          'Not My Profile'
        }
      </div>
      <div>
        {props.profile.owner ?
          <Link to={`${props.match.url}/edit`}>
            <button>
            Edit Profile
            </button>
          </Link>
          :
          null
        }
      </div>
      <Route
        path={`${props.match.path}/edit`}
        render={renderProps => (
          <EditProfile
            {...renderProps}
            authorized={props.profile.owner}
          />
        )}
      />
      <pre>{ JSON.stringify(props.profile) }</pre>
    </div>
  );
}

export default ShelterProfile;
