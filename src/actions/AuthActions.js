import firebase from '../firebase/index';


export const signin = () => {
  const user = firebase.auth().currentUser;
  return {
    type: 'SIGNIN',
    userInfo: {
      loggedIn: true,
      username: user.email,
    },
  }
};

export const signout = () => {
  firebase.auth().signOut();
  return {
    type: 'SIGNOUT',
    userInfo: {
      loggedIn: false,
    },
  }
};
