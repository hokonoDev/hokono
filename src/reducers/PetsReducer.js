import _ from 'lodash';
import firebase from '../firebase/index.js';
const storage = firebase.storage();
const database = firebase.database();

const fakeData = [
  {
    id: _.uniqueId('pet_'),
    name: 'fido',
    profilePic: '',
    likes: 10,
  },
  {
    id: _.uniqueId('pet_'),
    name: 'bandit',
    profilePic: '',
    likes: 5,
  },
  {
    id: _.uniqueId('pet_'),
    name: 'willy',
    profilePic: '',
    likes: 9001,
  }
];

//create a file and upload to firebase given a path
const createFile = (files, id) => {
  const storageRef = firebase.storage().ref(`${firebase.auth().currentUser.email}/${id}`);
  const uploadTask = storageRef.put(files.item(0));
  uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // console.log('Upload is ' + progress + '% done');
  // switch (snapshot.state) {
  //   case firebase.storage.TaskState.PAUSED: // or 'paused'
  //     console.log('Upload is paused');
  //     break;
  //   case firebase.storage.TaskState.RUNNING: // or 'running'
  //     console.log('Upload is running');
  //     break;
  // }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  const petProfPic = uploadTask.snapshot.downloadURL; //the download url for the newly added pet
});
}

const compressFile = (files) => {

}

export default (state = fakeData, action) => {
  switch (action.type) {
    case 'ADD_PET' :
      action.pet = {...action.pet, id: _.uniqueId('pet_')};
      // add this imgUrl to petsobj, renders images from firebase
      const imgUrl = createFile (action.pet.filePath, action.pet.id);
      action.pet.filePath = imgUrl;
      return [...state, { ...action.pet }];
    case 'EDIT_PET' :
      return state.map(pet => (
        pet.id === action.id ? { ...pet, ...action.edit } : pet
      ));
    default :
      return state;
  }
}
