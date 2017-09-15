import firebase from '../firebase/index';
import store from '../store';

//when a new chat message is created, write to sender and receiver in firebase
export const newChatMsg = (sender, receiver, receiveruid, receiverdName) => {
  //update chat database for receiver and sender
  const uid = firebase.auth().currentUser.uid;
  const dn = firebase.auth().currentUser.displayName;
  const chatTimeStamp = Date.now();
  sender.timeStamp = chatTimeStamp;
  receiver.timeStamp = chatTimeStamp;
  const key = firebase.database().ref(`/accounts/${uid}/chats/${receiveruid}/${receiverdName}`).push().key;
  const key2 = firebase.database().ref(`accounts/${receiveruid}/chats/${uid}/${dn}`).push().key
  var updates = {};
  updates[`/accounts/${uid}/chats/${receiveruid}/${receiverdName}/${key}`] = sender;
  updates[`/accounts/${receiveruid}/chats/${uid}/${dn}/${key2}`] = receiver;
  firebase.database().ref().update(updates);

  //listener (like a socket)
  firebase.database().ref(`/accounts/${uid}/chats/${receiveruid}/${receiverdName}`).on('value', (snapshot) => {
      const msgArray = snapshot.val();
      const action = {
        type:'NEW_CHAT_MSG',
        payload: {messages: msgArray },
      }
     // console.log("what is the format of this obj ", {[receiver.uid]: msgArray});
      store.dispatch(action);
    })
}

//set the receiver of your chatmessages, update the chatview
export const setCurrChat = (pic, name, receiveruid) => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/accounts/${uid}/chats/${receiveruid}/${name}`).on('value', (snapshot) => {
    const msgArray = snapshot.val();
    const action = {
      type:'SET_CHAT_RECEIVER',
      payload: {
        messages: msgArray,
        pic: pic,
        name: name,
        uid: receiveruid,
      },
    }
    store.dispatch(action);
  });
}

//get objects of all the people i've talked to (displayname and uid), used to display open chats
export const getAllMyChats = () => {
  const uid = firebase.auth().currentUser.uid;
  firebase.database().ref(`/accounts/${uid}/chats/`).once('value')
    .then((snapshot)=> {
      let msgObj = snapshot.val();
      //let nameArray = Object.keys(Object.values(msgObj));
      const action = {
        type:'GET_MY_CHATUSERS',
        payload: {
          chatUsers: msgObj,
          //this.props.chat.chatUsers
        }
      }
      store.dispatch(action);
    })
    .catch((err)=> {
      throw err;
    });
}

