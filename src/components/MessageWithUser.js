import React from 'react';
import { setCurrChat } from '../actions/ChatActions';

//button to set current chat
class MessageWithUser extends React.Component {
  //chat opens up when you click a button on another user's profile,
  // take that user's profile image and ID, pass into props
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <button onClick={()=> { setCurrChat('placeholderpic.png', this.props.username, this.props.userid)} }>
      Messages with: {this.props.username}
      </button>

    );
  }
}

export default MessageWithUser;