import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const userFollowedPet = (pet) => {
  const action = {
    type: 'FOLLOW_A_PET'
  };
  //pet has to be pet object
  //assume this is correct way to get user id and not shelterId
  const user = firebase.auth().currentUser;
  var updates = {};
  //these three API calls can be reduced with serverside cloud code
  //indented here to remember to go back to reduce API calls
    //user adds pet to his list of following
    //petowner.pet adds new userfollower to his pets followers
    const owner = pet.ownerUid;

    var obj1 = {};
    obj1[pet.id] = { nameDisplay: user.displayName };

    //followers and following user ids updated in following:{userid:{}, userid:{}} format
    updates[`/accounts/${user.uid}/following/` + pet.id] = { name: pet.name };
    updates[`/pets/${pet.id}/followers/` + user.uid] = { displayName: user.displayName };
    updates[`/accounts/${owner}/pets/${pet.id}/followers/` + user.uid] = { displayName: user.displayName };

    //counts for followers and following
    updates[`/accounts/${user.uid}/followingCount/`] =  store.getState().profile.followingCount + 1 || 1;
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
