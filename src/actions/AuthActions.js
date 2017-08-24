import firebase from '../firebase/index';
import store from '../store';

export const signinAction = () => {
  const user = firebase.auth().currentUser;
  const action = {
    type: 'SIGNIN',
    userInfo: {
      loggedIn: true,
      username: user.email,
      displayName: user.displayName,
      uid: user.uid,
      userObj: user,
    },
  };
  store.dispatch(action);
};

export const signoutAction = () => {
  firebase.auth().signOut();
  const action = {
    type: 'SIGNOUT',
    userInfo: {
      loggedIn: false,
    },
  };
  store.dispatch(action);
};
