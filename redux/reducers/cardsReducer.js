import {
  ADD_LIKE,
  DELETE_CARD,
  REMOVE_LIKE,
  SET_CARD,
  SET_CARDS,
} from '../actions/types';

const cardsReducer = (state = { cards: [] }, action) => {
  switch (action.type) {
    case SET_CARDS:
      return {
        ...state,
        cards: action.cards,
      };

    case SET_CARD:
      return {
        ...state,
        cards: [...state.cards, action.card],
      };

    case DELETE_CARD:
      return {
        ...state,
        cards: state.cards.filter((card) => card._id !== action.cardId),
      };

    case REMOVE_LIKE:
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card._id !== action.cardId) {
            return card;
          }
          return {
            ...card,
            likes: [...card.likes.filter((like) => like !== action.userId)],
          };
        }),
      };

    case ADD_LIKE:
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card._id !== action.cardId) {
            return card;
          }
          return {
            ...card,
            likes: [...card.likes, action.userId],
          };
        }),
      };

    default:
      return { ...state };
  }
};
export default cardsReducer;
