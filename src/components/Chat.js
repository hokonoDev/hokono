import React from 'react';
import { Launcher } from 'react-chat-window';
import { newChatMsg } from '../actions/ChatActions';

class Chat extends React.Component {
  //chat opens up when you click a button on another user's profile,
  // take that user's profile image and ID, pass into props
  constructor(props) {
    super(props);
    this.state = {
      messages: Object.values(this.props.messages),
    };
    this._onMessageWasSent = this._onMessageWasSent.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }
  _onMessageWasSent(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
    this._sendMessage(message);
  }
  _sendMessage(msg) {

    let sender = {
      author: 'me',
      type: 'text',

      data: { text: msg.data.text },
    };
    let receiver = {
      author: 'them',
      type: 'text',
      data: { text: msg.data.text },
    }
    newChatMsg(sender, receiver, this.props.chatReceiver.uid, this.props.chatReceiver.name);
    //dispatch action
    //write to both locations
    //listen on one location
      //update this.state.messages with listener data
  }

  render() {
    return (
      <div>
       <Launcher
        agentProfile={{
          teamName: this.props.chatReceiver.name || '',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png' || this.props.chatReceiver.pic,
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={Object.values(this.props.messages)}
      />
      </div>
    );
  }
}

export default Chat;