import store from '../../store';
import { distanceBetweenLocations } from '../../components/lib/helpers';

let origin;

export default (obj, sortType, lToG, searchTerm) => {
  origin = store.getState().profile.location;
  let sortedPets = Object.entries(obj).filter(data => !!data[1].name).sort(sortTypes[sortType]);
  sortedPets = lToG ? sortedPets : sortedPets.reverse();
  sortedPets = searchTerm ? searchSort(sortedPets, searchTerm) : sortedPets;
  sortedPets = sortedPets.reduce((pets, pet) => {
    pets[pet[0]] = pet[1];
    return pets;
  }, { Sort: [lToG ? 'Least' : 'Most', sortType] });
  return sortedPets;
}

const searchSort = (pets, term, results = []) => {
  pets = pets.slice();
  if(term.length <= 0) {
    return [...results, ...pets];
  }
  pets = pets.reduce((noMatch, pet, i) => {
    if (pet[1].name.slice(0, term.length).toLowerCase() === term.toLowerCase()) {
      results.push(pet);
      return noMatch;
    }
    return [...noMatch, pet]
  }, []);
  return searchSort(pets, term.slice(0, -1), results);
}

const likeSort = (pet1, pet2) => {
  return pet1[1].stars - pet2[1].stars;
}

const createdSort = (pet1, pet2) => {
  return pet1[1].timeStamp - pet2[1].timeStamp;
}

const trendingSort = (pet1, pet2) => {
  const pet1Rank = Math.log(10, pet1[1].stars + (pet1[1].timeStamp)/45000);
  const pet2Rank = Math.log(10, pet2[1].stars + (pet2[1].timeStamp)/45000);
  return pet1Rank - pet2Rank;
}

const popularSort = (pet1, pet2) => {
  return pet1[1].followersCount || 0 - pet2[1].followersCount || 0;
}


const distanceSort = (pet1, pet2) => {
  const pet1Dist = distanceBetweenLocations(origin, pet2[1].location);
  const pet2Dist = distanceBetweenLocations(origin, pet1[1].location);
  return pet1Dist - pet2Dist;
};

const sortTypes = {
  likeSort,
  createdSort,
  popularSort,
  trendingSort,
  distanceSort,
}
