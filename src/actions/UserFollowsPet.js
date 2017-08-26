import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const userFollowedPet(pet) {
  const action = { type: 'FOLLOW_A_PET' };

  //assume this is correct way to get user id and not shelterId
  const uid = firebase.auth().currentUser.uid;

  //user adds pet to his list of following
  //make sure pet is the correct pet has petID
  firebase.database().ref(`/accounts/${uid}/following`).push(petID);

  //pet adds user to his list of followers
  firebase.database().ref(`/pets/${petID}/followers`).push(uid);

  //petowner.pet adds new userfollower to his pets followers






}