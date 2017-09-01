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
    case 'STARED_A_PET' :
      return {...state, ...action.dataPet};
    case 'UNSTARED_A_PET' :
      return {...state, ...action.dataPet};
    default :
      return state;
  }
}
