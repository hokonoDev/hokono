import React from 'react';
import { IfRedirect } from './index';
import { editPetAction } from '../actions/PetsActions';

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

  imageUpload(e) {
    this.setState({ filePath: e.target.files.item(0) });
  }

  verify() {
    return window.confirm('Are you sure you want to make these edits?');
  }

  submit(e) {
    e.preventDefault();
    if(this.verify()) {
      const url = this.props.match.url;
      this.props.history.push(url.slice(0, url.length - 5));
      editPetAction(this.state, this.props.pet);
    }
  }

  render() {
    return (
      <div>
        <IfRedirect
          if={this.props.auth.uid === this.props.pet.ownerUid}
          ifFalse={this.props.match.url.replace('/edit', '')}
        />
        <form
          onSubmit={this.submit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.displayName}
            onChange={this.change}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.blurd}
            onChange={this.change}
          />
          <input type="file"
            accept="image/*"
            capture="camera"
            onChange={this.imageUpload.bind(this)}
          />
          <button
            type="submit"
          />
        </form>
      </div>
    );
  }
}
