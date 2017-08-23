export const addPet = (input) => {
  {console.log("dispatch received in actions", input)}
  return {
    type:'ADD_PET',
    pet: {
      name: input.name,
      profilePic: input.img,
      likes: 0,
    }
  }
}
