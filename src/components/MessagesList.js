import React from 'react';
import MessageWithUser from './MessageWithUser';
import { getAllMyChats} from '../actions/ChatActions';

//MessagesList generates a list of usernames and uid's that you have talked to
//it generates a chatlist
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

  //if there are new users that you've chatted with, update the chatlist
  // fires get request which will eventually update our props
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