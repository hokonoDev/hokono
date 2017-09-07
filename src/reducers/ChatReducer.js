export default (state = {}, action) => {
  switch (action.type) {
    case 'NEW_CHAT_MSG' :
      console.log("reducer correct? ", {state, ...action.payload});
      return {state, ...action.payload};
    default :
      return state;
  }
}