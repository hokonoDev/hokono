import firebase from '../firebase/index';
import store from '../store';
import _ from 'lodash';

export const addPet = (input) => {
  const action = {
    type:'ADD_PET',
    pet: {
      name: input.name,
      filePath: input.img,
      likes: 0,
    }
  }
  const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.email}/${action.pet.id}`);

  /*action.pet.filePath.item(0) should be COMPRESSED Base64 HERE
  *COMPRESS COMPRESS
  *COMPRESS action.pet.filePath.item(0)!!!!
  */

  const uploadTask = storageRef.put(action.pet.filePath.item(0));
  uploadTask.on('state_changed', function(snapshot){

  }, function(error) {
    // Handle unsuccessful uploads
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

      case 'storage/canceled':
        // User canceled the upload
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    //save the firebase hosted profile pic to pet.filepath
    action.pet.filePath = uploadTask.snapshot.downloadURL;

    const uid = firebase.auth().currentUser.uid;
    const key = firebase.database().ref(`/shelters/${uid}/pets`).push().key;
    var updates = {};
    updates[`/shelters/${uid}/pets` + key] = action.pet;
    firebase.database().ref().update(updates);
    console.log("is key right? ", key);
    //firebase.database().ref(`shelters/${uid}/pets`).push(action.pet);
    const temp = action.pet;
    temp.id = key;
    action.pet = {};
    action.pet[key] = temp;
    console.log("is this key correct or is it uid ", action.pet);
    store.dispatch(action);

    //
  });
}
