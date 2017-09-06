import firebase from '../firebase/index';
import store from '../store';

export const newChatMsg = (sender, receiver) => {
  const action = {
    type:'NEW_CHAT_MSG',
    sender: sender,
    receiver: {
      type: receiver.type,
      image: receiver.image,
      text: receiver.text,
    },
  }

  //update chat database for receiver and sender
  const uid = firebase.auth().currentUser.uid;
  const key = firebase.database().ref(`/accounts/${uid}/chats/${receiver.uid}`).push().key;
  const key2 = firebase.database().ref(`accounts/${receiver.uid}/chats/${uid}`).push().key
  var updates = {};
  updates[`/accounts/${uid}/chats/${key}`] = sender;
  updates[`/accounts/${receiver.uid}/chats/${key2}`] = action.receiver;
  firebase.database().ref().update(updates);

  //listener (like a socket)
  firebase.database.ref(`/accounts/${uid}/chats/${receiver.uid}`).on('value')
    .then(snapshot => {
      const msgArray = snapshot.val();
      msgArray = msgArray.slice(0, 15) || msgArray;
      store.dispatch({
        type:'NEW_CHAT_MSG',
        payload: {[receiver.uid]: msgArray},
      });
    })

}

