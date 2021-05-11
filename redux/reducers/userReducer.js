import {
  ADD_USER_CARD,
  DELETE_USER_CARD,
  SET_USER,
  SET_USER_CARDS,
  SHOW_EDIT_POPUP,
  SHOW_PLACE_POPUP,
  UPDATE_USER,
} from '../actions/types';

const defaultState = {
  user: 'noUser',
  cards: [],
  popupToShow: 'addNewPlace', // 'addNewPlace' or 'editInfo'
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_USER:
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
    case SHOW_EDIT_POPUP:
      return {
        ...state,
        popupToShow: 'editInfo',
      };
    case SHOW_PLACE_POPUP:
      return {
        ...state,
        popupToShow: 'addNewPlace',
      };
    default:
      return { ...state };
  }
};
export default userReducer;
