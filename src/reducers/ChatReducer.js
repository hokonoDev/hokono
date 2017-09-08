export default (state = {}, action) => {
  switch (action.type) {
    case 'NEW_CHAT_MSG' :
      return { ...state, ...action.payload };
    case 'SET_CHAT_RECEIVER' :
      return { ...state, ...action.payload };
    case 'GET_MY_CHATUSERS' :
      return { ...state, ...action.payload };
      //this.props.chat.chatUsers
    default :
      return state;
  }
}