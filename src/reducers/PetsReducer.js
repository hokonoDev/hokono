import _ from 'lodash';

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



export default (state = fakeData, action) => {
  switch (action.type) {
    case 'ADD_PET' :
      console.log("spread",[...state, { id: _.uniqueId('pet_'), ...action.pet }]);
      return [...state, { ...action.pet, id: _.uniqueId('pet_') }];
    case 'EDIT_PET' :
      return state.map(pet => (
        pet.id === action.id ? { ...pet, ...action.edit } : pet
      ));
    default :
      return state;
  }
}
