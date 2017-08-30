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

export const addPostAction = (postData, petId, ownerId) => {
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
    postData.likesCount = 0;
    postData.commentsCount = 0;

    // updating firebase DB
    const updates = {};
    updates[`/posts/${newPostKey}`] = postData;
    updates[`/pets/${petId}/posts/${newPostKey}`] = postData;
    updates[`/accounts/${ownerId}/pets/${petId}/posts/${newPostKey}`] = postData;

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

  // get current likesCount and likes from firebase
  firebase.database().ref(`/posts/${postId}`).once('value')
    .then(snapshot => {
      const current = snapshot.val();
      if (!!current.likes && !!current.likes[user.uid]) return;
      const newCount = current.likesCount + 1;
      const newLike = { [user.uid]: { timeStamp: Date.now() }};
      const newLikes = current.likes ? { ...current.likes, ...newLike} : newLike;

      // updates to firebase DB: new likesCount
      const updates = {};
      updates[`/posts/${postId}/likesCount`] = newCount;
      updates[`/pets/${petId}/posts/${postId}/likesCount`] = newCount;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likesCount`] = newCount;

      // updates to firebase DB: new likes
      updates[`/posts/${postId}/likes`] = newLikes;
      updates[`/pets/${petId}/posts/${postId}/likes`] = newLikes;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likes`] = newLikes;

      firebase.database().ref().update(updates);

      // updating redux store
      const action = {
        type: 'LIKE_POST',
        payload: {
          likesCount: newCount,
          likes: newLikes,
        },
        petId,
        postId,
      };
      store.dispatch(action);
    });
}


export const unlikePostAction = (postId, petId, ownerId) => {
  const user = firebase.auth().currentUser;

  // get current likesCount and likes from firebase
  firebase.database().ref(`/posts/${postId}`).once('value')
    .then(snapshot => {
      const current = snapshot.val();
      if (!!current.likes && !current.likes[user.uid]) return;
      const newCount = current.likesCount - 1;
      delete current.likes[user.uid];
      const newLikes = current.likes;

      // updates to firebase DB: new likesCount
      const updates = {};
      updates[`/posts/${postId}/likesCount`] = newCount;
      updates[`/pets/${petId}/posts/${postId}/likesCount`] = newCount;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likesCount`] = newCount;

      // updates to firebase DB: new likes
      updates[`/posts/${postId}/likes`] = newLikes;
      updates[`/pets/${petId}/posts/${postId}/likes`] = newLikes;
      updates[`/accounts/${ownerId}/pets/${petId}/posts/${postId}/likes`] = newLikes;

      firebase.database().ref().update(updates);

      // updating redux store
      const action = {
        type: 'LIKE_POST',
        payload: {
          likesCount: newCount,
          likes: newLikes,
        },
        petId,
        postId,
      };
      store.dispatch(action);
    });
}
