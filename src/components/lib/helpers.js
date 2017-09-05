import firebase from '../../firebase/index';

export const getDisplayNameFromUid = (uid) => {
  return firebase.database().ref(`accounts/${uid}`).once('value')
    .then(snapshot => snapshot.val().displayName);
};

export const getNameFromPetId = (petId) => {
  return firebase.database().ref(`pets/${petId}`).once('value')
    .then(snapshot => snapshot.val().name);
};
