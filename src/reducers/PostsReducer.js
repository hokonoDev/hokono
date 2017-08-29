export default (state = {}, action) => {
  switch (action.type) {
    case 'POPULATE_POSTS' :
      return action.payload;
    case 'UPDATE_POSTS' :
      return { ...state, ...action.payload }
    default :
      return state;
  }
}
