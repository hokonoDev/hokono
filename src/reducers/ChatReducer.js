export default (state = {}, action) => {
  switch (action.type) {
    case 'NEW_CHAT_MSG' :
      return {state, ...action.payload};
    default :
      return state;
  }
}