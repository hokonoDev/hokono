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
  return {
    type: 'SIGNOUT',
    loggedIn: false,
  }
};
