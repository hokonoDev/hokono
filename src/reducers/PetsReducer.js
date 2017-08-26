import _ from 'lodash';
import firebase from '../firebase/index.js';

const storage = firebase.storage();
const database = firebase.database();

const fakeData = [
  {
    id: _.uniqueId('pet_'),
    name: 'fido',
    profilePic: '',
    likes: 10,
  },
  {
    id: _.uniqueId('pet_'),
    name: 'bandit',
    profilePic: '',
    likes: 5,
  },
  {
    id: _.uniqueId('pet_'),
    name: 'willy',
    profilePic: '',
    likes: 9001,
  }
];

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
    default :
      return state;
  }
}
