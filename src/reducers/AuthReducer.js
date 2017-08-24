export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGNIN' :
      return { ...action.userInfo };
    default :
      return state;
  }
}
