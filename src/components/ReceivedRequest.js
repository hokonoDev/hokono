import React from 'react';
import { getDisplayNameFromUid } from './lib/helpers';
import { adoptRequestStatusAction } from '../actions/ShelterProfileActions';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      requester: '',
    };
  }

  componentWillMount() {
    getDisplayNameFromUid(this.props.uid)
      .then(name => this.setState({ requester: name }));
  }

  render() {
    return (
      <div
        style={{border: '1px solid black'}}
      >
        <h4>Request to adopt {this.props.profile.pets[this.props.petId].name}!</h4>
        <p>from {this.state.requester}</p>
        <p>Status: {this.props.status}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            adoptRequestStatusAction('accepted', this.props.petId, this.props.uid);
          }}
        >Accept</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            adoptRequestStatusAction('denied', this.props.petId, this.props.uid);
          }}
        >Deny</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            adoptRequestStatusAction('pending', this.props.petId, this.props.uid);
          }}
        >Pending</button>
      </div>
    );
  }
}
