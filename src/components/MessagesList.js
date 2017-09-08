import React from 'react';
import MessageWithUser from './MessageWithUser';

const MessagesList (props) => (
  <div>
    {Object.values(this.props.users).map((users)=> {
      <MessageWithUser user={users}/>
    })}
  </div>
)


export default MessagesList;