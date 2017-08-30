import firebase from '../firebase/index';
import store from '../store';

export const fetchAllPostsAction = () => {
  firebase.database().ref('posts').once('value')
    .then(snapshot => {
      const posts = snapshot.val();
      store.dispatch({
        type: 'POPULATE_POSTS',
        payload: posts,
      });
    });
};

export const fetchPostsByPetIdAction = (petId) => {
  firebase.database().ref(`pets/${petId}/posts`).once('value')
    .then(snapshot => {
      const posts = snapshot.val();
      store.dispatch({
        type: 'GET_POST',
        payload: posts,
      });
    });
}

export const addPostAction = (postData, petId) => {
  const user = firebase.auth().currentUser;
  const newPostKey = firebase.database().ref('/posts').push().key;
  const storageRef = firebase.storage().ref(`${user.uid}/${petId}/${newPostKey}`);

  // Upload image to FB storage
  const uploadTask = storageRef.put(postData.image);
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
    // Add reference to FB storage of image
    postData.image = uploadTask.snapshot.downloadURL;

    // Adding post default information
    postData.likes = 0;
    postData.comments = 0;

    console.log(postData);
    // updating firebase DB
    const updates = {};
    updates[`/posts/${newPostKey}`] = postData;
    updates[`/pets/${petId}/posts/${newPostKey}`] = postData;
    updates[`/accounts/${user.uid}/pets/${petId}/posts/${newPostKey}`] = postData;

    firebase.database().ref().update(updates);

    // updating redux store
    const action = {
      type: 'UPDATE_POSTS',
      payload: {
        [newPostKey]: postData,
      },
      petId: petId,
    };
    store.dispatch(action);
  });
};

export const likePostAction = (postId, petId, ownerId) => {
  const user = firebase.auth().currentUser;

  // get current ..
  Promise.all([
    firebase.database().ref(`/posts/${postId}`).once('value'),
    firebase.database().ref(`/accounts/${user.uid}/myPostLikes`).once('value')
  ])
    .then(snapshots => {
      const current = snapshots[0].val();
      console.log(current);
      if (!!current.likedBy && !!current.likedBy[user.uid]) return;
      const newCount = current.likes + 1;
      const newLikedBy = { [user.uid]: { timeStamp: Date.now() }};
      const likedBy = current.likedBy ? { ...current.likedBy, ...newLikedBy} : newLikedBy;

      const myPostLikes = { ...snapshots[1].val(), [postId]: { petId: petId }};

      // updates to firebase DB: new likes
      const updates = {};
      updates[`/posts/${postId}/likes`] = newCount;
      updates[`/pets/${petId}/posts/${postId}/likes`] = newCount;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likes`] = newCount;

      // updates to firebase DB: new likes
      updates[`/posts/${postId}/likedBy`] = likedBy;
      updates[`/pets/${petId}/posts/${postId}/likedBy`] = likedBy;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likedBy`] = likedBy;

      //updates to firebase DB: new myPostLikes
      updates[`/accounts/${user.uid}/myPostLikes`] = myPostLikes;

      console.log(updates);

      firebase.database().ref().update(updates);

      // updating redux store
      const action = {
        type: 'LIKE_POST',
        payload: {
          likes: newCount,
          likedBy: likedBy,

        },
        petId,
        postId,
      };
      store.dispatch(action);
    });
}


export const unlikePostAction = (postId, petId, ownerId) => {
  const user = firebase.auth().currentUser;

  // get current likes and likedBy from firebase
  Promise.all([
    firebase.database().ref(`/posts/${postId}`).once('value'),
    firebase.database().ref(`/accounts/${user.uid}/myPostLikes`).once('value')
  ])
    .then(snapshots => {
      const current = snapshots[0].val();
      if (!!current.likedBy && !current.likedBy[user.uid]) return;
      console.log('unliking');
      const newCount = current.likes - 1;
      delete current.likedBy[user.uid];
      const newLikedBy = current.likedBy;

      const myPostLikes = snapshots[1].val();
      delete myPostLikes[postId];

      // updates to firebase DB: new likes
      const updates = {};
      updates[`/posts/${postId}/likes`] = newCount;
      updates[`/pets/${petId}/posts/${postId}/likes`] = newCount;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likes`] = newCount;

      // updates to firebase DB: new likedBy
      updates[`/posts/${postId}/likedBy`] = newLikedBy;
      updates[`/pets/${petId}/posts/${postId}/likedBy`] = newLikedBy;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likedBy`] = newLikedBy;

      //updates to firebase DB: new myPostLikes
      updates[`/accounts/${user.uid}/myPostLikes`] = myPostLikes;

      firebase.database().ref().update(updates);

      // updating redux store
      const action = {
        type: 'LIKE_POST',
        payload: {
          likes: newCount,
          likedBy: newLikedBy,
          myPostLikes,
        },
        petId,
        postId,
      };
      store.dispatch(action);
    });
}
