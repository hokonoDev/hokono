import axios from 'axios';
import { GOOGLE_API_KEY } from '../../APIs/Keys';
import firebase from '../../firebase/index';

export const getDisplayNameFromUid = (uid) => {
  return firebase.database().ref(`accounts/${uid}`).once('value')
    .then(snapshot => snapshot.val().displayName);
};

export const getNameFromPetId = (petId) => {
  return firebase.database().ref(`pets/${petId}`).once('value')
    .then(snapshot => snapshot.val().name);
};

export const cordsFromAddress = (addr) => {
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`)
    .then(res => res.data.results[0].geometry.location);
};

export const distanceBetweenLocations = (origin, destination) => {
  if (typeof origin === 'object')
    origin = `${origin.lat},${origin.lng}`;
  if (typeof destination === 'object')
    destination = `${destination.lat},${destination.lng}`;
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${GOOGLE_API_KEY}`)
    .then(res => res.rows[0].elements[0].distance.text);
}
