import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';

const uiReducer = (state = { notification: null }, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          status: action.status,
          title: action.title,
          message: action.message,
        },
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return { ...state };
  }
};

export default uiReducer;
