import React from 'react';
import { Link } from 'react-router-dom';
import { getDisplayNameFromUid, getNameFromPetId } from './lib/helpers';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      owner: '',
      pet: '',
    };
  }

  componentWillMount() {
    getDisplayNameFromUid(this.props.ownerUid)
      .then(name => this.setState({ owner: name }));
    getNameFromPetId(this.props.petId)
      .then(name => this.setState({ pet: name }));
  }

  render() {
    return (
      <div
        className="req-box"
      >
        <h4
          className="req-title"
        >{`You're request to adopt `}
          <Link
            to={`/pet/${this.props.petId}/profile`}
          >{this.state.pet.toUpperCase()}</Link> is ...
        </h4>
        <p
          className="req-status"
          style={
            this.props.status === 'accepted' ? { color: 'darkgreen' } :
              this.props.status === 'denied' ? { color: 'darkred' } : { color: 'black' }
          }
        >{this.props.status.toUpperCase()}</p>
      </div>
    );
  }
}
