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
      id: _.uniqueId('pet_'),
    }
  }
  const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.email}/${action.pet.id}`);
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
    // Handle successful uploads on complete
    //the download url for the newly added pet
    //save the firebase hosted profile pic to pet.filepath
    action.pet.filePath = uploadTask.snapshot.downloadURL;
    store.dispatch(action);
  });
}
