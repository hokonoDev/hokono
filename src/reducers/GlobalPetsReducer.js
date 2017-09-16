import petsSort from './lib/petsSort';

export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_PETS' :
      return { ...state, ...action.allPets };
    case 'EDIT_PET' :
      const copy = { ...state };
      copy[action.petId] = { ...copy[action.petId], ...action.payload };
      return copy;
    case 'SORT_GLOBAL_PETS' :
      return petsSort(state, action.sortType, action.lToG, action.searchTerm);
    case 'STARRED_A_PET' :
      const nextState = {...state, ...action.dataPet};
      return nextState;
    case 'UNSTARRED_A_PET' :
      return {...state, ...action.dataPet};
    case 'UPDATE_POSTS' :
      if(!state[action.petId].posts) {
        state[action.petId].posts = {};
      }
      state[action.petId].posts = { ...state[action.petId].posts, ...action.payload };
      return state;
    case 'LIKE_POST' :
      if (!state[action.petId]) return state;
      const stateCopy = {...state};
      stateCopy[action.petId].posts[action.postId].likes = action.payload.likes;
      stateCopy[action.petId].posts[action.postId].likedBy = action.payload.likedBy;
      return stateCopy;
    case 'SIGNOUT' :
      return {};
    default :
      return state;
  }
}
