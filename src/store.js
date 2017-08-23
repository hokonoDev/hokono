import { createStore, combineReducers } from 'redux';
import PetsReducer from './reducers/PetsReducer';
import ShelterProfReducer from './reducers/ShelterProfReducer';
import AuthReducer from './reducers/AuthReducer';

const comboReducer = combineReducers({
  pets: PetsReducer,
  profile: ShelterProfReducer,
  auth: AuthReducer,
});

export default createStore(comboReducer);
