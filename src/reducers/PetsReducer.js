import _ from 'lodash';

const fakeData = [
  {
    name: 'fido',
    profilePic: '',
    likes: 10,
  },
  {
    name: 'bandit',
    profilePic: '',
    likes: 5,
  },
  {
    name: 'willy',
    profilePic: '',
    likes: 9001,
  }
];



export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_PET' :
      return [...state, { ...action.pet, id: _.uniqueId('pet_') }];
    case 'EDIT_PET' :
      return state.map(pet => (
        pet.id === action.id ? { ...pet, ...action.edit } : pet
      ));
    default :
      return state;
  }
}
