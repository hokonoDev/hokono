import React from 'react';
import { Route, Link } from 'react-router-dom';
import {
  EditProfile,
  IfRender,
  ProfilePetList,
} from './index';
import { setCurrChat } from '../actions/ChatActions';

const ShelterProfile = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.profile) !== JSON.stringify(this.props.profile)){
      this.setProfileData();
    }
  }

  componentDidMount() {
    this.setProfileData();
  }

  setProfileData() {
    if (!this.props.profile.owner){
      this.props.profile.profilePromise
        .then(item => {
          this.setState({ profile: { ...item.val(), owner: false }});
        });
    } else {
      this.setState({ profile: this.props.profile });
    }
  }

  render() {
    return (
      <div>
        <h3>{this.state.profile.displayName}</h3>
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
          <Route
            path={`${this.props.match.path}/edit`}
            render={renderProps => (
              <EditProfile
                {...renderProps}
                authorized={this.props.profile.owner}
              />
            )}
          />
        </div>
        <div>
          <img
            src={this.state.profile.profPic || '/images/edit-profile.png'}
            style={{
              height: '200px',
              width: '200px',
            }}
          />
          <p>Address: {this.state.profile.address}</p>
          <p>Email: {this.state.profile.email}</p>
          <IfRender
            if={this.state.profile.phone}
            ifTrue={() => <p>Phone: {this.state.profile.phone}</p>}
          />
          {this.props.profile.owner ?
            null
            :
            <button onClick={()=> { setCurrChat(this.state.profile.profPic, this.state.profile.displayName, this.state.profile.uid)} }>
            Message {this.state.profile.acctType}
            </button>
          }
        </div>
        <ProfilePetList
          petData={this.state.profile.pets || {}}
        >
        </ProfilePetList>
      </div>
    );
  }
}


export default ShelterProfile;
