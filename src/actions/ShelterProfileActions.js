import firebase from '../firebase/index';
import store from '../store';
import { signinAction } from './AuthActions';

export const initAction = (payload) => {
  const user = firebase.auth().currentUser;
  console.log(payload);

  firebase.database().ref(`shelters/${user.uid}`).set(payload);

  user.updateProfile({
    displayName: payload.displayName,
    email: user.email,
  })
    .then(() => {
      console.log('successful update', firebase.auth().currentUser);
      signinAction();
    });

  const action = {
    type: 'INIT',
    payload,
  };
  store.dispatch(action);
}
