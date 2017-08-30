import petsSort from './lib/petsSort';

export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_PETS' :
      return { ...state, ...action.allPets };
    case 'SORT_GLOBAL_PETS' :
      return petsSort(state, action.sortType, action.lToG, action.searchTerm);
    case 'LIKED_A_PET' :
      return {...state, ...action.dataPet};
    case 'UNLIKED_A_PET' :
      return {...state, ...action.dataPet};
    case 'LIKE_POST' :
      if (!state[action.petId]) return state;
      const stateCopy = {...state};
      console.log(stateCopy)
      stateCopy[action.petId].posts[action.postId].likes = action.payload.likes;
      stateCopy[action.petId].posts[action.postId].likedBy = action.payload.likedBy;
      return stateCopy;
    default :
      return state;
  }
}
