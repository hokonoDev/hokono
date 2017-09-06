import React from 'react';
import ChatBubble from 'react-chat-bubble';
import { newChatMsg } from '../actions/ChatActions';

class Chat extends React.Component {
  //chat opens up when you click a button on another user's profile,
  // take that user's profile image and pass into props
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: [],
    };
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  onNewMessage(msg) {
    let sender = {
      type: 0,
      image: '',
      text: msg
    };
    let receiver = {
      type: 1,
      image: this.props.img || '',
      text: msg

    }

    newChatMsg(sender, receiver);
    //dispatch action
    //write to both locations
    //listen on one location
      //update this.state.messages with listener data
  }



  render() {
    return (
      <ChatBubble onNewMessage={this.onNewMessage} messages={this.state.messages}/>
    );
  }
}

export default Chat;