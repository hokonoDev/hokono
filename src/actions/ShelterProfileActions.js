import firebase from '../firebase/index';
import store from '../store';
import { signinAction } from './AuthActions';
import { getPets } from './AuthActions';

export const updateFromDBAction = () => {
  const action = { type: 'UPDATE_PROFILE' };
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/shelters/${uid}`).once('value')
    .then(snapshot => {
      if (snapshot.val()) return snapshot.val();
      throw new Error('no profile');
    })
    .then(val => {
      action.payload = val;
      if(val) {
        getPets(action.payload);
      }
      store.dispatch(action);
    })
    .catch(err => {
      if (err.toString() !== 'Error: no profile') return console.error(err);
      firebase.database().ref(`/users/${uid}`).once('value')
        .then(snapshot => {
          if (snapshot.val()) return snapshot.val();
          throw new Error('no profile');
        })
        .then(val => {
          action.payload = val;
          if(val) {
            getPets(action.payload);
          }
          store.dispatch(action);
        })
    });
}

export const initAction = (payload) => {
  const user = firebase.auth().currentUser;

  payload = {
    ...payload,
    pets: {},
    blurb: '',
    profPic: '',
    uid: user.uid,
    email: user.email,
  };

  firebase.database().ref(`${payload.acctType}s/${user.uid}`).set(payload);

  user.updateProfile({
    displayName: payload.displayName,
    email: payload.email,
  })
    .then(() => {
      signinAction();
    });

  const action = {
    type: 'UPDATE_PROFILE',
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
