import React from 'react';
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
        style={{border: '1px solid black'}}
      >
        <h4>Request to adopt {this.state.pet}!</h4>
        <p>from {this.state.owner}</p>
        <p>Status: {this.props.status}</p>
      </div>
    );
  }
}
