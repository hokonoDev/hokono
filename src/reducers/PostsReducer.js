export default (state = {}, action) => {
  switch (action.type) {
    case 'POPULATE_POSTS' :
      return action.payload;
    case 'GET_POST' :
      return { ...state, ...action.payload };
    case 'UPDATE_POSTS' :
      return { ...state, ...action.payload }
    case 'LIKE_POST' :
      const stateCopy = {...state};
      stateCopy[action.postId].likesCount = action.payload.likesCount;
      stateCopy[action.postId].likes = action.payload.likes;
      return stateCopy;
    default :
      return state;
  }
}
