import { combineReducers } from 'redux';
import cardsReducer from './cardsReducer';
import userReducer from './userReducer';
export default combineReducers({
  cardsReducer,
  userReducer,
});
