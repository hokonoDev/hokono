export default (state = {}, action) => {
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
        console.log("wdf",{ ...state, following: {...state.following, ...action.data.following} });
        return { ...state, following: {...state.following, ...action.data.following} };
        //if success unfollowing, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    case 'LIKED_A_PET' :
      if (action.payload === 'success') {
        //this myLikes property is so user can see what pets hes liked.
        return {...state, myLikes: {...state.myLikes, ...action.data.myLikes} };
      }
    case 'UNLIKED_A_PET' :
      if (action.payload === 'success') {
        //this myLikes property is so user can see what pets hes liked.
        return {...state, myLikes: {...state.myLikes, ...action.data.myLikes} };
      }
    default :
      return state;
  }
}
