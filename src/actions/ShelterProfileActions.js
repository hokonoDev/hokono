import firebase from '../firebase/index';
import store from '../store';
import { signinAction } from './AuthActions';
import { getPets } from './AuthActions';

export const updateFromDBAction = () => {
  const action = { type: 'UPDATE_PROFILE' };
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/accounts/${uid}`).once('value')
    .then(snapshot => {
      action.payload = snapshot.val() || {};
      action.payload.got = true;
      if(snapshot.val()) {
        getPets(action.payload);
      }
      store.dispatch(action);
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
    following: {},
  };

  firebase.database().ref(`accounts/${user.uid}`).set(payload);

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

  firebase.database().ref(`accounts/${user.uid}`).update(payload)
    .then(() => {
      updateFromDBAction();
    });

}

export const adoptRequestAction = (currentRequests = {}, petId, ownerUid) => {
  const user = firebase.auth().currentUser;
  const now = Date.now();
  const action = {
    type: 'NEW_ADOPT_REQUEST',
    payload: {
      ...currentRequests,
      [petId]: now,
    },
  };

  firebase.database().ref(`accounts/${ownerUid}/adoptRequests/${petId}`).once('value')
    .then(snapshot => {
      const requests = snapshot.val() || {};
      firebase.database().ref().update({
        [`accounts/${ownerUid}/adoptRequests/${petId}`]: {...requests, [user.uid]: now},
      });
    });

  firebase.database().ref().update({
    [`accounts/${user.uid}/adoptRequests`]: action.payload,
  });
  store.dispatch(action);
}
