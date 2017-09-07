export default (state = {}, action) => {
  switch (action.type) {
    case 'NEW_CHAT_MSG' :
      console.log("new chat reducer? ", {...state, ...action.payload});
      return { ...state, ...action.payload };
    case 'SET_CHAT_RECEIVER' :
      console.log("set chat reducer? ", { ...state, ...action.payload });
      return { ...state, ...action.payload };
    default :
      return state;
  }
}