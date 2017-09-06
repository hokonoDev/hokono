import { createStore, combineReducers } from 'redux';
import PetsReducer from './reducers/PetsReducer';
import ShelterProfReducer from './reducers/ShelterProfReducer';
import AuthReducer from './reducers/AuthReducer';
import GlobalPetsReducer from './reducers/GlobalPetsReducer';
import PostsReducer from './reducers/PostsReducer';
import FollowingReducer from './reducers/FollowingReducer';
import ChatReducer from './reducers/ChatReducer';
import firebase from './firebase/index';
import fb from 'firebase';
import { signinAction } from './actions/AuthActions';
import { updateFromDBAction } from './actions/ShelterProfileActions';

const comboReducer = combineReducers({
  pets: PetsReducer,
  profile: ShelterProfReducer,
  auth: AuthReducer,
  gPets: GlobalPetsReducer,
  posts: PostsReducer,
  following: FollowingReducer,
  chat: ChatReducer,
});

const user = fb.auth().currentUser;

const auth = !user ? { loggedIn: false } :
  {
    loggedIn: true,
    username: user.email,
    uid: user.uid,
    userObj: user,
  };

const profile = !user ? {} :
  {
    displayName: user.displayName,
    email: user.email,
    address: user.address,
    phone: user.phoneNumber,
  };

fb.auth().onAuthStateChanged((user) => {
  if (user) {
    signinAction();
    updateFromDBAction();
  }
});

const store = createStore(comboReducer, {
  auth,
  profile: {...profile, got: false},
});

export default store;
