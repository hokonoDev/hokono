import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const userFollowedPet(pet) {
  const action = { type: 'FOLLOW_A_PET' };
  //pet has to be pet object
  //assume this is correct way to get user id and not shelterId
  const uid = firebase.auth().currentUser.uid;

  //these three API calls can be reduced with serverside cloud code
    //user adds pet to his list of following
    //make sure pet is the correct pet has petID
    firebase.database().ref(`/accounts/${uid}/following`).push(pet.id);

    //pet adds user to his list of followers
    firebase.database().ref(`/pets/${pet.id}/followers`).push(uid);

    //petowner.pet adds new userfollower to his pets followers
    const owner = pet.ownerUid;
    firebase.database().ref(`/accounts/${owner}/pets/${pet.id}/followers`).push(uid);

  store.dispatch(action);



}