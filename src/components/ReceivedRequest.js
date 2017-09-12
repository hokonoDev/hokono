import React from 'react';
import { Link } from 'react-router-dom';
import { getDisplayNameFromUid } from './lib/helpers';
import { adoptRequestStatusAction, adoptRequestCloseAction } from '../actions/ShelterProfileActions';

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
        className="req-box"
      >
        <p
          className="req-title"
        >
          <Link
            to={`/user/profile/${this.props.uid}`}
          >{this.state.requester.toUpperCase()}</Link>
          {` has requested to adopt `}
          <Link
            to={`/pet/${this.props.petId}/profile`}
          >{this.props.profile.pets[this.props.petId].name.toUpperCase()}</Link>
          !
        </p>
        {
          this.props.closed || this.props.status === 'open' || this.props.status === 'pending' ? null :
          <button
            className="close-button"
            onClick={(e) => {
              e.preventDefault();
              adoptRequestCloseAction(this.props.petId, this.props.uid);
            }}
          >X</button>
        }
        <p
          className="req-status"
          style={
            this.props.status === 'accepted' ? { color: 'darkgreen' } :
              this.props.status === 'denied' ? { color: 'darkred' } : { color: 'black' }
          }
        >{this.props.status.toUpperCase()}</p>
        {
          this.props.closed ? null :
          <div
            className="req-interactions"
          >
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
        }
      </div>
    );
  }
}
