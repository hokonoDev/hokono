import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const userFollowedPet = (pet) => {
  const action = {
    type: 'FOLLOW_A_PET'
  };
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

    var obj1 = {};
    obj1[pet.id] = true;

    //followers and following user ids updated in following:{userid:{}, userid:{}} format
    updates[`/accounts/${uid}/following/` + pet.id] = true;
    updates[`/pets/${pet.id}/followers/` + uid] = true;
    updates[`/accounts/${owner}/pets/${pet.id}/followers/` + uid] = true;

    //counts for followers and following
    updates[`/accounts/${uid}/followingCount/`] =  store.getState().profile.followingCount + 1 || 1;
    updates[`/pets/${pet.id}/followersCount/`] = pet.followersCount + 1 || 1;
    updates[`/accounts/${owner}/pets/${pet.id}/followersCount/`] = pet.followersCount + 1 || 1;

    firebase.database().ref().update(updates).then(() => {
      action.data = { following: obj1 };
      action.payload = "success";
      store.dispatch(action);
    }, (err) => {
      action.payload = "err";
      throw err;
    });
}