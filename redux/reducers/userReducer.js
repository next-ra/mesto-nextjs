import { SET_USER } from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return { ...state };
  }
};
export default userReducer;
