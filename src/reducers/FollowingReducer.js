import postsSort from './lib/postsSort';

export default (state = {}, action) => {
  switch (action.type) {
    case 'POPULATE_FOLLOWING_POSTS' :
      if (state.postsSort) {
        return postsSort({ ...state, posts: action.payload }, state.postsSort[1], state.postsSort[0] === 'Least', '');
      }
      return { ...state, posts: action.payload };
    case 'LIKE_POST' :

      if (!state.posts || !state.posts[action.postId]) return state;
      const stateCopy = {...state};
      stateCopy.posts[action.postId].likes = action.payload.likes;
      stateCopy.posts[action.postId].likedBy = action.payload.likedBy;
      return stateCopy;
    case 'SORT_FOLLOWING_POSTS' :
      const nextState = postsSort(state, action.sortType, action.lToG, action.searchTerm);
      return nextState;
    case 'SIGNOUT' :
      return {};
    default :
      return state;
  }
}
