import firebase from '../firebase/index.js';
import petsSort from './lib/petsSort';

const storage = firebase.storage();
const database = firebase.database();

const compressFile = (files) => {
//base64Url the image
}

export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PET' :
      return {...state,  ...action.pet };
    case 'EDIT_PET' :
      return state.map(pet => (
        pet.id === action.id ? { ...pet, ...action.edit } : pet
      ));
    case 'GETPETS' :
      return {...state, ...action.payload};
    case 'CLEAR_PETS' :
      return {};
    case 'SORT_MY_PETS' :
      return petsSort(state, action.sortType, action.lToG, action.searchTerm);
    default :
      return state;
  }
}
