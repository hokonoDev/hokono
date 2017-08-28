export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_PETS' :
      if (action.payload === "success") {

      } else {
        return { ...state };
      }
    default :
      return state;
  }
}