import {
  ADD_USER_CARD,
  DELETE_USER_CARD,
  SET_USER,
  SET_USER_CARDS,
} from '../actions/types';

const userReducer = (state = { user: 'noUser', cards: [] }, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_USER_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    case ADD_USER_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card],
      };
    case DELETE_USER_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.cardId),
      };
    default:
      return { ...state };
  }
};
export default userReducer;
