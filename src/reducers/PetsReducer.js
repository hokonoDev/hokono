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
    case 'UPDATE_POSTS' :
      state[action.petId].posts = { ...state[action.petId].posts, ...action.payload };
      return state;
    case 'LIKE_POST' :
      if (!state[action.petId]) return state;
      const stateCopy = {...state};
      stateCopy[action.petId].posts[action.postId].likesCount = action.payload.likesCount;
      stateCopy[action.petId].posts[action.postId].likes = action.payload.likes;
      return stateCopy;
    default :
      return state;
  }
}
