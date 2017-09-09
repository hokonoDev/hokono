import firebase from '../firebase/index';
import store from '../store';

export const getAllPets = (input) => {
  const action = {
    type:'GET_ALL_PETS',
    allPets: {}
  }
  //get all pets from firebase
  firebase.database().ref(`/pets`).once('value')
    .then((snapshot)=> {
      action.allPets = snapshot.val() || {};
      store.dispatch(action);
    })
    .catch((err)=> {
      throw err;
    });

}

export const sortGlobalPetsAction = (sortType, sortDirection, searchTerm) => {
  const action = {
    type: 'SORT_GLOBAL_PETS',
    sortType: sortType,
    lToG: sortDirection === 'Least',
    searchTerm,
  }
  store.dispatch(action);
}
