import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      description: '',
    }
  }

  render() {
    return(
      <div>
        Add Pet Post Form:
        <form>
           Add img from phone camera
          <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={(e) => {

            }}
          />
          <input
            type="text"
            placeholder="Description..."
          />
          <button type="submit">
            Add Pet
          </button>
        </form>
      </div>
    );
  }
}
