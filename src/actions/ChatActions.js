import firebase from '../firebase/index';
import store from '../store';

export const newChatMsg = (sender, receiver) => {
  //update chat database for receiver and sender
  const uid = firebase.auth().currentUser.uid;
  const key = firebase.database().ref(`/accounts/${uid}/chats/${receiver.uid}`).push().key;
  const key2 = firebase.database().ref(`accounts/${receiver.uid}/chats/${uid}`).push().key
  var updates = {};

  updates[`/accounts/${uid}/chats/${receiver.uid}/${key}`] = sender;
  updates[`/accounts/${receiver.uid}/chats/${uid}/${key2}`] = receiver;

  firebase.database().ref().update(updates);

  //listener (like a socket)
  firebase.database.ref(`/accounts/${uid}/chats/${receiver.uid}`).on('value')
    .then(snapshot => {
      const msgArray = snapshot.val();
      console.log("hopefully an array of messages", msgArray);
      const action = {
        type:'NEW_CHAT_MSG',
        payload: {[receiver.uid]: msgArray},
      }
      console.log("what is the format of this obj ", {[receiver.uid]: msgArray});
      store.dispatch(action);
    })

}

