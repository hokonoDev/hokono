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
    profPic: '/images/edit-profile.png',
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

  if (payload.profPic) {
    const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.uid}/profile`);
    storageRef.put(payload.profPic)
      .then(snapshot => {
        storageRef.getDownloadURL().then(profPic => {
        payload.profPic = profPic;
        firebase.database().ref(`accounts/${user.uid}`).update(payload)
          .then(() => {
            updateFromDBAction();
          });
        });
      });
  } else {
    firebase.database().ref(`accounts/${user.uid}`).update(payload)
      .then(() => {
        updateFromDBAction();
      });
  }
}

export const adoptRequestAction = (currentRequests = {}, petId, ownerUid) => {
  const user = firebase.auth().currentUser;
  const now = Date.now();
  const action = {
    type: 'NEW_ADOPT_REQUEST',
    payload: {
      ...currentRequests,
      [petId]: {
        timeStamp: now,
        ownerUid,
        status: 'open',
      },
    },
  };

  firebase.database().ref(`accounts/${ownerUid}/adoptRequests/${petId}`).once('value')
    .then(snapshot => {
      const requests = snapshot.val() || {};
      firebase.database().ref().update({
        [`accounts/${ownerUid}/adoptRequests/${petId}`]: {...requests, [user.uid]: { timeStamp: now, status: 'open' }},
      });
    });

  firebase.database().ref().update({
    [`accounts/${user.uid}/adoptRequests`]: action.payload,
  });
  store.dispatch(action);
}

export const adoptRequestStatusAction = (status, petId, requesterUid) => {
  const user = firebase.auth().currentUser;
  const action = {
    type: 'UPDATE_ADOPT_REQUEST_STATUS',
    payload: {
      status: status,
    },
    petId,
    requesterUid,
  };

  firebase.database().ref().update({
    [`accounts/${user.uid}/adoptRequests/${petId}/${requesterUid}/status`]: status,
    [`accounts/${requesterUid}/adoptRequests/${petId}/status`]: status,
  });

  store.dispatch(action);
};

export const adoptRequestCloseAction = (petId, requesterUid) => {
  const user = firebase.auth().currentUser;
  const action = {
    type: 'CLOSE_ADOPT_REQUEST',
    payload: {
      closed: true,
    },
    petId,
    requesterUid,
  };

  firebase.database().ref().update({
    [`accounts/${user.uid}/adoptRequests/${petId}/${requesterUid}/closed`]: true,
    [`accounts/${requesterUid}/adoptRequests/${petId}/closed`]: true,
  });

  store.dispatch(action);
};
