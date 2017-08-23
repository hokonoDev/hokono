import _ from 'lodash';

const fakeData = [
  {
    id: 'pet_1',
    name: 'fido',
    profilePic: '',
    likes: 10,
    pet_: 1
  },
  {
    id: 'pet_2',
    name: 'bandit',
    profilePic: '',
    likes: 5,
    pet_: 2
  },
  {
    id: 'pet_3',
    name: 'willy',
    profilePic: '',
    likes: 9001,
    pet_: 3,
  }
];



export default (state = fakeData, action) => {
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
