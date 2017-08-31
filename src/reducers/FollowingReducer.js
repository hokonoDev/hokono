import petsSort from './lib/petsSort';

export default (state = {}, action) => {
  switch (action.type) {
    case 'POPULATE_FOLLOWING_POSTS' :
      return { ...state, posts: action.payload };
    case 'LIKE_POST' :
      console.log(state);
      if (!state.posts[action.postId]) return state;
      const stateCopy = {...state};
      stateCopy.posts[action.postId].likes = action.payload.likes;
      stateCopy.posts[action.postId].likedBy = action.payload.likedBy;
      console.log(stateCopy)
      return stateCopy;
    default :
      return state;
  }
}
