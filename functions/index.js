const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updateStarsCount2 = functions.database.ref(`/accounts/{userId}/myStars/{petId}`)
  .onCreate(event => {
    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    //GET the owner id from the pet id
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return admin.database().ref(`/pets/${petId}/stars`).transaction( stars => {
      if (stars) {
        stars = stars + 1;
      }
      return stars || 1;
    });
  });

exports.updateStarsCount = functions.database.ref(`/accounts/{userId}/myStars/{petId}`)
  .onCreate(event => {

    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    //GET the owner id from the pet id
    return admin.database().ref(`/pets/${petId}/ownerUid`).once('value')
      .then(snapshot => {
        let owner = snapshot.val();
        return admin.database().ref(`/accounts/${owner}/pets/${petId}/stars/`).transaction( stars => {
          if (stars) {
            stars = stars + 1;
          }
          return stars || 1;
        });
      });
  });

exports.updateUnstarsCount = functions.database.ref(`/accounts/{pushId}/myStars/{petId}`)
  .onDelete(event => {
    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    return admin.database().ref(`/pets/${petId}/stars/`).transaction( stars => {
      if (stars) {
        stars = stars - 1;
      }
      return stars || 0;
    });
  });

exports.updateUnstarsCount2 = functions.database.ref(`/accounts/{pushId}/myStars/{petId}`)
  .onDelete(event => {
  // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    return admin.database().ref(`/pets/${petId}/ownerUid`).once('value')
      .then(snapshot => {
        let owner = snapshot.val();
        return admin.database().ref(`/accounts/${owner}/pets/${petId}/stars/`).transaction( stars => {
          if (stars) {
            stars = stars - 1;
          }
          return stars || 0;
        });
      });
  });

exports.updateFollowCount2 = functions.database.ref(`/accounts/{userId}/following/{petId}`)
  .onCreate(event => {
    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return admin.database().ref(`/pets/${petId}/followersCount`).transaction( likes => {
      if (likes) {
        likes = likes + 1;
      }
      return likes || 1;
    });
  });

exports.updateFollowCount = functions.database.ref(`/accounts/{userId}/following/{petId}`)
  .onCreate(event => {

    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    //GET the owner id from the pet id
    return admin.database().ref(`/pets/${petId}/ownerUid`).once('value')
      .then(snapshot => {
        let owner = snapshot.val();
        return admin.database().ref(`/accounts/${owner}/pets/${petId}/followersCount/`).transaction( likes => {
          if (likes) {
            likes = likes + 1;
          }
          return likes || 1;
        });
      });
  });

exports.updateUnfollowCount = functions.database.ref(`/accounts/{pushId}/following/{petId}`)
  .onDelete(event => {
    // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    return admin.database().ref(`/pets/${petId}/followersCount`).transaction( likes => {
      if (likes) {
        likes = likes - 1;
      }
      return likes || 0;
    });
  });

exports.updateUnfollowCount2 = functions.database.ref(`/accounts/{pushId}/following/{petId}`)
  .onDelete(event => {
  // Grab the current value of what was written to the Realtime Database.
    const petId = event.params.petId; //gets the petid from the {petId} url
    return admin.database().ref(`/pets/${petId}/ownerUid`).once('value')
      .then(snapshot => {
        let owner = snapshot.val();
        return admin.database().ref(`/accounts/${owner}/pets/${petId}/followersCount/`).transaction( likes => {
          if (likes) {
            likes = likes - 1;
          }
          return likes || 0;
        });
      });
  });

exports.updateFollowingCount = functions.database.ref(`/accounts/{userId}/following/{petId}`)
  .onCreate(event => {
    // Grab the current value of what was written to the Realtime Database.
    const userId = event.params.userId;
    const petId = event.params.petId; //gets the petid from the {petId} url
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return admin.database().ref(`/accounts/${userId}/followingCount/`).transaction( likes => {
      if (likes) {
        likes = likes + 1;
      }
      return likes || 1;
    });
  });

exports.updateUnfollowingCount = functions.database.ref(`/accounts/{userId}/following/{petId}`)
  .onDelete(event => {
    // Grab the current value of what was written to the Realtime Database.
    const userId = event.params.userId;
    const petId = event.params.petId; //gets the petid from the {petId} url
    return admin.database().ref(`/accounts/${userId}/followingCount/`).transaction( likes => {
      if (likes) {
        likes = likes - 1;
      }
      return likes || 0;
    });
  });


