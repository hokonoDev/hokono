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
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <h3
            className="title"
          >{this.state.profile.displayName}</h3>
          <div
            className="row-box-space"
            style={{ marginBottom: '30px', width: '700px' }}
          >
            <img
              src={this.state.profile.profPic || '/images/edit-profile.png'}
              alt=""
              style={{
                height: '200px',
                width: '200px',
                imagePosition: 'center',
                objectFit: 'cover',
                border: '1px solid lightgrey',
                borderRadius: '50%',
              }}
            />
            <div
              className="col-box"
              style={{
                justifyContent: 'space-around'
              }}
            >
              <div>
                <div
                  className="row-box"
                  style={{ alignItems: 'flex-end', margin: '20px', marginTop: '0px' }}
                >
                  <img style={{ height: '20px', width: '20px', marginRight: '10px' }} src="/images/apartment.svg" alt="" />
                  <p>{this.state.profile.address}</p>
                </div>
                <div
                  className="row-box"
                  style={{ alignItems: 'flex-end', margin: '20px' }}
                >
                  <img style={{ height: '20px', width: '20px', marginRight: '10px' }} src="/images/mail.svg" alt="" />
                  <p>{this.state.profile.email}</p>
                </div>
                <IfRender
                  if={this.state.profile.phone}
                  ifTrue={() =>
                    <div
                      className="row-box"
                      style={{ alignItems: 'flex-end', margin: '20px' }}
                    >
                      <img style={{ height: '20px', width: '20px', marginRight: '10px' }} src="/images/smartphone.svg" alt="" />
                      <p>{this.state.profile.phone}</p>
                    </div>
                  }
                />
              </div>
              {
                !this.state.profile.blurb ? null :
                <p
                  style={{
                    marginBottom: '20px',
                    padding: '10px',
                    boxShadow: '0px 0px 0px 1px #d8d8d8',
                  }}
                >{this.state.profile.blurb}</p>
              }
              <div
                className="row-box-center"
              >
                {this.props.profile.owner && this.props.location.pathname.split('/').pop() !== 'edit' ?
                  <Link to={`${this.props.match.url}/edit`}>
                    <button>
                    Edit Profile
                    </button>
                  </Link>
                  :
                  null
                }
                {
                  this.props.profile.owner ? null :
                  <button onClick={()=> { setCurrChat(this.state.profile.profPic, this.state.profile.displayName, this.state.profile.uid)} }>
                  Message {this.state.profile.acctType}
                  </button>
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
            </div>
          </div>
          <ProfilePetList
            petData={this.state.profile.pets || {}}
          >
          </ProfilePetList>
        </div>
      </div>
    );
  }
}


export default ShelterProfile;
