import firebase from '../firebase/index';
import store from '../store';
import { updateFromDBAction } from './ShelterProfileActions';

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
};
