import _ from 'lodash';
import firebase from '../firebase/index.js';

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
    default :
      return state;
  }
}
