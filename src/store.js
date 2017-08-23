import { createStore, combineReducers } from 'redux';
import PetsReducer from './reducers/PetsReducer';
import ShelterProfReducer from './reducers/ShelterProfReducer';
import AuthReducer from './reducers/AuthReducer';

const comboReducer = combineReducers({
  Pets: PetsReducer,
  ShelterProf: ShelterProfReducer,
  Auth: AuthReducer,
});

export default createStore(comboReducer, {
  Auth: {},
  Pets: [],
  ShelterProf: {},
});
