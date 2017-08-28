import petsSort from './lib/petsSort';

export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_PETS' :
      return { ...state, ...action.allPets };
    case 'SORT_GLOBAL_PETS' :
      return petsSort(state, action.sortType, action.lToG, action.searchTerm);
    default :
      return state;
  }
}
