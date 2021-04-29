import { SET_CARD, SET_CARDS } from '../actions/types';

const cardsReducer = (state = {}, action) => {
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
    default:
      return state;
  }
};
export default cardsReducer;
