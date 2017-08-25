const fakeData = {
  name: 'myShelter',
  addr: '123 Main St.',
  phone: '(123)456-7890',
  email: 'shelter@gmail.com',
  profilePicUrl: 'img.jpg',
  pets: [],
};

export default (state = fakeData, action) => {
  switch (action.type) {
    case 'UPDATE' :
      return { ...state, ...action.payload };
    default :
      return state;
  }
}
