import firebase from '../firebase/index';
import store from '../store';

export const initAction = (payload) => {
  const user = firebase.auth().currentUser;
  console.log(payload);

  firebase.database().ref(`users/${user.uid}`).set(payload);

  user.updateProfile({ displayName: payload.displayName })
    .then(() => {
      console.log('successful update', firebase.auth().currentUser);
    });

  const action = {
    type: 'INIT',
    payload,
  };
  store.dispatch(action);
}
