import { SHOW_NOTIFICATION } from '../actions/types';

const uiReducer = (
  state = {
    notification: {
      status: 'error',
      title: 'test',
      message: 'test',
    },
  },
  action,
) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    default:
      return { ...state };
  }
};

export default uiReducer;
