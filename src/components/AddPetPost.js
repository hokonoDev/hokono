import React from 'react';
import { addPostAction } from '../actions/PostsActions';
import { IfRedirect } from './index';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      description: '',
      key: 0,
    }

    this.submit = this.submit.bind(this);
  }

  validate() {
    return !!this.state.image;
  }

  submit(e) {
    e.preventDefault();
    if (this.validate()) {
      addPostAction({
        image: this.state.image,
        description: this.state.description,
      }, this.props.pet.id, this.props.pet.ownerUid,this.props.pet.name);

      this.setState({
        image: '',
        description: '',
        key: ++this.state.key,
      });
    }
  }

  render() {
    return(
      <div
        className="col-box-center"
      >
        <div
          className="gen-box"
        >
          <IfRedirect
            if={this.props.auth.loggedIn}
            ifFalse="/"
          />
          <p
            className="title"
          >New Pet Post</p>
          <form
            onSubmit={this.submit}
            className="add-pet-form"
          >
             <p>Add an Image</p>
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={(e) => this.setState({ image: e.target.files.item(0) })}
              key={this.state.key}
            />
            <p>Add a Description</p>
            <input
              type="text"
              placeholder="Description..."
              onChange={(e) => this.setState({ description: e.target.value })}
              value={this.state.description}
            />
            <button
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}
