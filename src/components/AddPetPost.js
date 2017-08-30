import React from 'react';
import { addPostAction } from '../actions/PostsActions';

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
      console.log(this.state)
      addPostAction({
        image: this.state.image,
        description: this.state.description,
      }, this.props.pet.id);

      this.setState({
        image: '',
        description: '',
        key: ++this.state.key,
      });
    }
  }

  render() {
    return(
      <div>
        Add Pet Post:
        <form
          onSubmit={this.submit}
        >
           Add img from phone camera
          <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => this.setState({ image: e.target.files.item(0) })}
            key={this.state.key}
          />
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
    );
  }
}
