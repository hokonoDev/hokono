export default (obj, sortType, lToG, searchTerm) => {
  const sort = (lToG ? ['<', sortType] : ['>', sortType]).join('.');
  let sortedPets = Object.entries(obj).filter(data => !!data[1].name).sort(sortTypes[sortType]);
  sortedPets = lToG ? sortedPets : sortedPets.reverse();
  sortedPets = searchTerm ? searchSort(sortedPets, searchTerm) : sortedPets;
  sortedPets = sortedPets.reduce((pets, pet) => {
    pets[pet[0]] = pet[1];
    return pets;
  }, { sort });
  return sortedPets;
}

const searchSort = (pets, term, results = []) => {
  pets = pets.slice();
  if(term.length <= 0) {
    return [...results, ...pets];
  }
  pets = pets.reduce((noMatch, pet, i) => {
    if (pet[1].name.slice(0, term.length) === term) {
      results.push(pet);
      return noMatch;
    }
    return [...noMatch, pet]
  }, []);
  return searchSort(pets, term.slice(0, -1), results);
}


const likeSort = (pet1, pet2) => {
  return pet1[1].likes - pet2[1].likes;
}

const createdSort = (pet1, pet2) => {
  return pet1[1].timeStamp - pet2[1].timeStamp;
}

const sortTypes = {
  likeSort,
  createdSort,
}
