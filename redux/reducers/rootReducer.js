import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import userReducer from './userReducer';
import uiReducer from './uiReducer';
export default combineReducers({
  cardsReducer,
  userReducer,
  uiReducer,
});
