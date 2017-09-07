import firebase from '../firebase/index';
import store from '../store';

export const newChatMsg = (sender, receiver) => {
  //update chat database for receiver and sender
  console.log("this is sender ", sender);
  console.log("this is recever ", receiver);
  const uid = firebase.auth().currentUser.uid;
  const key = firebase.database().ref(`/accounts/${uid}/chats/${receiver.uid}`).push().key;
  const key2 = firebase.database().ref(`accounts/${receiver.uid}/chats/${uid}`).push().key
  var updates = {};
  updates[`/accounts/${uid}/chats/${receiver.uid}/${key}`] = sender;
  updates[`/accounts/${receiver.uid}/chats/${uid}/${key2}`] = receiver;
  firebase.database().ref().update(updates);

  //listener (like a socket)
  firebase.database().ref(`/accounts/${uid}/chats/${receiver.uid}`).on('value', (snapshot) => {
      const msgArray = snapshot.val();
      console.log("Objectlist of messages", msgArray);
      const action = {
        type:'NEW_CHAT_MSG',
        payload: {messages: msgArray },
      }
     // console.log("what is the format of this obj ", {[receiver.uid]: msgArray});
      store.dispatch(action);
    })
}

export const setCurrChat = (pic, name, receiveruid) => {
  console.log("set curr chat action triggered ", pic, name, receiveruid);
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/accounts/${uid}/chats/${receiveruid}`).on('value', (snapshot) => {
    const msgArray = snapshot.val();
    console.log("Objectlist of messages", msgArray);
    const action = {
      type:'SET_CHAT_RECEIVER',
      payload: {
        messages: msgArray,
        pic: pic,
        name: name,
        uid: receiveruid,
      },
    }
   // console.log("what is the format of this obj ", {[receiver.uid]: msgArray});
    store.dispatch(action);
  });

}

