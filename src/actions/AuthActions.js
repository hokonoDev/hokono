import firebase from '../firebase/index';
import store from '../store';
import { updateFromDBAction } from './ShelterProfileActions';
import { getAllPets } from './GlobalPetsActions';

export const getPets = (payload) => {
  const action = {type:'GETPETS'};
  action.payload = payload.pets;
  store.dispatch(action);
}

export const signinAction = () => {
  const user = firebase.auth().currentUser;
  const action = {
    type: 'SIGNIN',
    payload: {
      loggedIn: true,
      username: user.email,
      displayName: user.displayName,
      uid: user.uid,
    },
  };
  updateFromDBAction();
  getAllPets();
  store.dispatch(action);
};

export const signoutAction = () => {
  firebase.auth().signOut();
  const action = {
    type: 'SIGNOUT',
    payload: {
      loggedIn: false,
    },
  };
  store.dispatch(action);
  store.dispatch({ type: 'CLEAR_PETS' })
};

export const setDisplayNameUndefined = () => {
  const user = firebase.auth().currentUser;
  const action = {
    type: 'FACEBOOKLOGIN',
    payload:{
      displayName: undefined,
    }
  }
  store.dispatch(action);
}
