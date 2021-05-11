import {
  ADD_USER_CARD,
  DELETE_USER_CARD,
  SET_USER,
  SHOW_EDIT_POPUP,
  SHOW_PLACE_POPUP,
  SHOW_UPDATE_AVATAR_POPUP,
} from '../actions/types';

const defaultState = {
  user: 'noUser',
  cards: [],
  popupToShow: '', // 'addNewPlace' or 'editInfo' or 'updateAvatar'
  popupTitle: '', // Новое место, Редактировать профиль, Обновить аватар
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
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
        popupTitle: 'Редактировать профиль',
      };
    case SHOW_PLACE_POPUP:
      return {
        ...state,
        popupToShow: 'addNewPlace',
        popupTitle: 'Новое место',
      };
    case SHOW_UPDATE_AVATAR_POPUP:
      return {
        ...state,
        popupToShow: 'updateAvatar',
        popupTitle: 'Обновить аватар',
      };
    default:
      return { ...state };
  }
};
export default userReducer;
