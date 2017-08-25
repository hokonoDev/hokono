import firebase from '../firebase/index';
import store from '../store';
import { signinAction } from './AuthActions';

export const updateFromDBAction = () => {
  const action = { type: 'UPDATE' };
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/shelters/${uid}`).once('value')
    .then(snapshot => {
      action.payload = snapshot.val();
      console.log(action);
      store.dispatch(action);
    });
}

export const initAction = (payload) => {
  const user = firebase.auth().currentUser;

  payload = {
    ...payload,
    pets: [],
    blurb: '',
    profPic: '',
    uid: user.uid,
    email: user.email,
    acctType: 'shelter',
  };

  firebase.database().ref(`shelters/${user.uid}`).set(payload);

  user.updateProfile({
    displayName: payload.displayName,
    email: payload.email,
  })
    .then(() => {
      signinAction();
    });

  const action = {
    type: 'UPDATE',
    payload,
  };
  store.dispatch(action);
}

export const editProfileAction = (payload) => {
  const user = firebase.auth().currentUser;

  firebase.database().ref(`shelters/${user.uid}`).update(payload)
    .then(() => {
      updateFromDBAction();
    });

}
