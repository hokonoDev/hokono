export default (state = {}, action) => {
  switch (action.type) {
    case 'FOLLOW_A_PET' :
      if (action.payload === 'success') {
        //if success following, i don't need to read from db, just update store and trust that db and store will be the same

      }
      return state;
    case 'SIGNOUT' :
      return {};
    default :
      return state;
  }
}
