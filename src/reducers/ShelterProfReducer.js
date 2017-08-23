const fakeData = {
  name: 'myShelter',
  addr: '123 Main St.',
  phone: '(123)456-7890',
  email: 'shelter@gmail.com',
  profilePicUrl: 'img.jpg',
};

export default (state = fakeData, action) => {
  switch (action.type) {
    case 'EDIT_PROFILE' :
      return { ...state, ...action.edit };
    default :
      return state;
  }
}
