import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const userFollowedPet = (pet) => {
  const action = { type: 'FOLLOW_A_PET' };
  //pet has to be pet object
  //assume this is correct way to get user id and not shelterId
  const uid = firebase.auth().currentUser.uid;
  var updates = {};
  //these three API calls can be reduced with serverside cloud code
  //indented here to remember to go back to reduce API calls
    //user adds pet to his list of following
    //make sure pet is the correct pet has petID
    var key1 = firebase.database().ref(`/accounts/${uid}/following`).push().key;

    //pet adds user to his list of followers
    var key2 = firebase.database().ref(`/pets/${pet.id}/followers`).push().key;

    //petowner.pet adds new userfollower to his pets followers
    const owner = pet.ownerUid;
    var key3 = firebase.database().ref(`/accounts/${owner}/pets/${pet.id}/followers`).push().key;

    //we need to use update to receive a promise (as opposed to push)
    updates[`/accounts/${uid}/following` + key1] = pet.id;
    updates[`/pets/${pet.id}/followers` + key2] = uid;
    updates[`/accounts/${owner}/pets/${pet.id}/followers` + key3] = uid;
    firebase.database().ref().update(updates).then(results=> {
      console.log("Successfully updated user following pet to db", results);
      action.payload("success");
      return results;
    }).catch(err=> {
      console.log("ERROR updating user follows pet", err);
      action.payload("err");
      throw err;
    });
  store.dispatch(action);
}