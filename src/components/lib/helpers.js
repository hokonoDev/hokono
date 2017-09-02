import firebase from '../../firebase/index';

export const getDisplayNameFromUid = async (uid) => {
  return firebase.database().ref(`accounts/${uid}`).once('value')
    .then(snapshot => snapshot.val().displayName);
};
