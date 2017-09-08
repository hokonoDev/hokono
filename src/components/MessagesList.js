import React from 'react';
import MessageWithUser from './MessageWithUser';
import { getAllMyChats} from '../actions/ChatActions';

class MessagesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (this.props.auth.loggedIn) {
      getAllMyChats();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.loggedIn !== prevProps.auth.loggedIn)
    {
      if (this.props.auth.loggedIn) {
        getAllMyChats();
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.props.chat.chatUsers ? Object.keys(this.props.chat.chatUsers).map(keyId=> (
            <MessageWithUser userid={ keyId } username={Object.keys(this.props.chat.chatUsers[keyId])[0]}/>
          )) : null
        }
      </div>
    )
  }
}
export default MessagesList;

/* {Object.values(props.chat.users).map((users)=> {

    })}*/