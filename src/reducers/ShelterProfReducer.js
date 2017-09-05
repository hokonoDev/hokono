export default (state = { got: false }, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE' :
      return { ...state, ...action.payload };
    case 'FOLLOW_A_PET' :
      if (action.payload === 'success') {
        return { ...state, following: {...state.following, ...action.data.following} };
        //if success following, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    case 'UNFOLLOW_A_PET' :
      if (action.payload === 'success') {
        let copy = {...state, following: {...state.following, ...action.data.following}};
        delete copy.following[action.petId];
        return copy;
        //if success unfollowing, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    case 'STARRED_A_PET' :
      if (action.payload === 'success') {
        //this myStars property is so user can see what pets hes liked.
        return {...state, myStars: {...state.myStars, ...action.data} };
      }
      return state;
    case 'UNSTARRED_A_PET' :
      if (action.payload === 'success') {
        //this myStars property is so user can see what pets hes liked.
        return {...state, myStars: {...state.myStars, ...action.data.myStars} };
      }
      return state;
    case 'UPDATE_POSTS' :
      state.pets[action.petId].posts = { ...state.pets[action.petId].posts, ...action.payload };
      return state;
    case 'LIKE_POST' :
      if (!state.pets || !state.pets[action.petId]) return state;
      const stateCopy = {...state};
      stateCopy.pets[action.petId].posts[action.postId].likes = action.payload.likes;
      stateCopy.pets[action.petId].posts[action.postId].likedBy = action.payload.likedBy;
      return stateCopy;
    case 'NEW_ADOPT_REQUEST' :
      return {...state, ...action.payload};
    case 'UPDATE_ADOPT_REQUEST_STATUS':
      return {
        ...state,
        adoptRequests: {
          ...state.adoptRequests,
          [action.petId]: {
            ...state.adoptRequests[action.petId],
            [action.requesterUid]: {
              ...state.adoptRequests[action.petId][action.requesterUid],
              ...action.payload,
            }
          }
        }
      };
    case 'SIGNOUT' :
      return { got: false };
    default :
      return state;
  }
}
