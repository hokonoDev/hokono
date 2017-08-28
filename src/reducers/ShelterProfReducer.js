export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE' :
      return { ...state, ...action.payload };
    case 'FOLLOW_A_PET' :
      if (action.payload === 'success') {
        return { ...state, ...action.data };
        //if success following, i don't need to read from db, just update store and trust that db and store will be the same
      } else {
        return { ...state };
      }
    default :
      return state;
  }
}
