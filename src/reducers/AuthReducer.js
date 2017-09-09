export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGNIN' :
      return { ...action.payload };
    case 'SIGNOUT' :
      return { ...action.payload };
    case 'FACEBOOKLOGIN' :
      return {...state, ...action.payload };
    default :
      return state;
  }
}
