export const addPet = (input) => {
  console.log(input);
  return {
    type:'ADD_PET',
    pet: {
      name: input.name,
      filePath: input.img,
      likes: 0,
    }
  }
}
