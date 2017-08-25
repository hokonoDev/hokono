import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { EditProfile } from './index';
import { Nav } from './index';

const ShelterProfile = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    if (!this.props.profile.owner){
      this.props.profile.profilePromise
        .then(item =>
          this.setState({ profile: { ...item.val(), owner: false }})
        );
    } else {
      this.setState({ profile: this.props.profile });
    }
  }

  render() {
    return (
      <div>
        <div>
          {
            this.props.profile.owner ?
            'My Profile'
            :
            'Not My Profile'
          }
        </div>
        <div>
          {this.props.profile.owner ?
            <Link to={`${this.props.match.url}/edit`}>
              <button>
              Edit Profile
              </button>
            </Link>
            :
            null
          }
        </div>
        <Route
          path={`${this.props.match.path}/edit`}
          render={renderProps => (
            <EditProfile
              {...renderProps}
              authorized={this.props.profile.owner}
            />
          )}
        />
        <pre>Profile: { JSON.stringify(this.state.profile) }</pre>
      </div>
    );
  }
}

export default ShelterProfile;
