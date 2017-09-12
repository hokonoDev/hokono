import firebase from '../firebase/index';
import store from '../store';

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
    //updates[`/accounts/${user.uid}/followingCount/`] =  store.getState().profile.followingCount + 1 || 1;
    //updates[`/pets/${pet.id}/followersCount/`] = pet.followersCount + 1 || 1;
    //updates[`/accounts/${owner}/pets/${pet.id}/followersCount/`] = pet.followersCount + 1 || 1;

    firebase.database().ref().update(updates).then(() => {
      action.data = { following: obj1 };
      action.payload = "success";
      store.dispatch(action);
    }, (err) => {
      action.payload = "err";
      throw err;
    });
}

export const userUnfollowedPet = (pet) => {
  const action = {
    type: 'UNFOLLOW_A_PET'
  };
  const user = firebase.auth().currentUser;
  var updates = {};
  const owner = pet.ownerUid;

  var obj1 = {};
  obj1[pet.id] = null;

  //unfollow nulls
  updates[`/accounts/${user.uid}/following/` + pet.id] = null;
  updates[`/pets/${pet.id}/followers/` + user.uid] = null;
  updates[`/accounts/${owner}/pets/${pet.id}/followers/` + user.uid] = null;

  //counts for followers and following
  //updates[`/accounts/${user.uid}/followingCount/`] =  store.getState().profile.followingCount - 1 || 0;
  //updates[`/pets/${pet.id}/followersCount/`] = pet.followersCount - 1 || 0;
  //updates[`/accounts/${owner}/pets/${pet.id}/followersCount/`] = pet.followersCount - 1 || 0;

  firebase.database().ref().update(updates).then(() => {
    action.data = { following: obj1 };
    action.petId = pet.id;
    action.payload = "success";
    store.dispatch(action);
  }, (err) => {
    action.payload = "err";
    throw err;
  });
}

export const userStarredPet = (pet) => {
  const action = {
    type: 'STARRED_A_PET'
  };

  const user = firebase.auth().currentUser;
  var updates = {};
  const owner = pet.ownerUid;

  var obj1 = {};
  obj1[pet.id] = { displayName: user.displayName };
  const currTime = Date.now();

  updates[`/accounts/${user.uid}/myStars/` + pet.id] = { name: pet.name };
  updates[`/pets/${pet.id}/starredBy/` + user.uid] = { displayName: user.displayName, createdAt: currTime };
  updates[`/accounts/${owner}/pets/${pet.id}/starredBy/` + user.uid] = { displayName: user.displayName, createdAt: currTime };

  //counts for followers and following
  //updates[`/pets/${pet.id}/stars/`] = pet.stars + 1 || 1;
  //updates[`/accounts/${owner}/pets/${pet.id}/stars/`] = pet.stars + 1 || 1;

  firebase.database().ref().update(updates).then(() => {
    //updates the users stars in state/store
    action.data = {
      [pet.id]: {
        displayName: user.displayName
      }
    };
    pet.stars = pet.stars + 1 || 1;
    pet.starredBy = {
      ...pet.starredBy,
      [user.uid]: {
        displayName: user.displayName,
        createdAt: currTime,
      }
    };

    //updates the globalpetfeed state/store with stars
    action.dataPet = {
      [pet.id]: pet,
    };
    action.payload = "success";
    store.dispatch(action);
  }, (err) => {
    action.payload = "err";
    throw err;
  });
}

export const userUnstarredPet = (pet) => {
  const action = {
    type: 'UNSTARRED_A_PET'
  };

  const user = firebase.auth().currentUser;
  var updates = {};
  const owner = pet.ownerUid;

  const obj1 = {};
  obj1[pet.id] = null;

  updates[`/accounts/${user.uid}/myStars/` + pet.id] = null;
  updates[`/pets/${pet.id}/starredBy/` + user.uid] = null;
  updates[`/accounts/${owner}/pets/${pet.id}/starredBy/` + user.uid] = null;

  //counts for followers and following
  //updates[`/pets/${pet.id}/stars/`] = pet.stars - 1 || 0;
  //updates[`/accounts/${owner}/pets/${pet.id}/stars/`] = pet.stars - 1 || 0;

  firebase.database().ref().update(updates).then(() => {
    //updates a users unstars in state/store
    action.data = { myStars: obj1 };
    pet.stars = pet.stars - 1 || 0;
    const emptyObj = {};
    emptyObj[user.uid] = null;
    pet.starredBy = emptyObj;
    const emptyObj2 = {};
    emptyObj2[pet.id] = pet;

    //updates a pets unstars in state/store
    action.dataPet = { emptyObj2 };
    action.payload = "success";
    store.dispatch(action);
  }, (err) => {
    action.payload = "err";
    throw err;
  });
}
