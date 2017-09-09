import React, { Component } from 'react';
import MessageList from './MessageList'
import UserInput from './UserInput'
import Header from './Header'


class ChatWindow extends Component {
    constructor(props) {
      super(props);
    }

    onUserInputSubmit(message) {
      if (this.props.agentProfile.teamName) {
        this.props.onUserInputSubmit(message);
      }
    }

    onMessageReceived(message) {
      this.setState({ messages: [...this.state.messages, message] });
    }

    render() {
      let messageList = this.props.messageList || [];
      let classList = [
        "sc-chat-window",
        (this.props.active ? " active" : " inactive")
      ];
      return (
        <div className={classList.join(' ')}>
          <Header
            teamName={this.props.agentProfile.teamName}
            imageUrl={this.props.agentProfile.imageUrl}
            onClose={this.props.onClose}
          />
          <MessageList
            messages={messageList}
            imageUrl={this.props.agentProfile.imageUrl}
          />
          <UserInput onSubmit={this.onUserInputSubmit.bind(this)}/>
        </div>
      );
    }
}

export default ChatWindow;
