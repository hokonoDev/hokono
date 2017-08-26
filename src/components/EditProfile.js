import React from 'react';
import { IfRedirect } from './index';
import { editProfileAction } from '../actions/ShelterProfileActions';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change({ target }) {
    const nextState = {};
    nextState[target.name] = target.value;
    this.setState(nextState);
  }

  verify() {
    return window.confirm('Are you sure you want to make these edits?');
  }

  submit(e) {
    e.preventDefault();
    if(this.verify()) {
      const url = this.props.match.url;
      this.props.history.push(url.slice(0, url.length - 5));
      editProfileAction(this.state);
    }
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.authorized}
          ifFalse={this.props.match.url.replace('/edit', '')}
        />
        <form
          onSubmit={this.submit}
        >
          <input
            type="text"
            name="displayName"
            placeholder="Shelter's Name"
            value={this.state.displayName}
            onChange={this.change}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={this.state.address}
            onChange={this.change}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.change}
          />
          <input
            type="text"
            name="blurb"
            placeholder="Describe Your Shelter"
            value={this.state.blurd}
            onChange={this.change}
          />
          <button
            type="submit"
          />
        </form>
      </div>
    );
  }

}
