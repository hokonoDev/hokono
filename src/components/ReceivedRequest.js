import React from 'react';
import { getDisplayNameFromUid } from './lib/helpers';

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
        {console.log('recReq props:', this.props)}
        <h4>Request to adopt {this.props.profile.pets[this.props.petId].name}!</h4>
        <p>from {this.state.requester}</p>
      </div>
    );
  }
}
