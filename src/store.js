import { createStore, combineReducers } from 'redux';
import PetsReducer from './reducers/PetsReducer';
import ShelterProfReducer from './reducers/ShelterProfReducer';
import AuthReducer from './reducers/AuthReducer';
import firebase from './firebase/index';

const comboReducer = combineReducers({
  pets: PetsReducer,
  profile: ShelterProfReducer,
  auth: AuthReducer,
});

const user = firebase.auth().currentUser;
const auth = !user ? { loggedIn: false } :
  {
    loggedIn: true,
    username: user.email,
  };

const fakeAuth = {
    loggedIn: true,
    username: 'draymore26@gmail.com',
  };

export default createStore(comboReducer, {
  auth: fakeAuth,
});
