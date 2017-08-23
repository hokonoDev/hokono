const fakeData = {
  user: true,
  username: 'admin@gmail.com',
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGNIN' :
      return { user: action.user, username: action.user.email };
    default :
      return state;
  }
}
