import navigation from './containers/Navigation/reducer';
import { combineReducers } from 'redux-immutable';
// XX: Do not rename this variable if you want reducer generator
// to keep working properly (and you do want that, right?)
const applicationReducers = { navigation: navigation };
export default function createReducer() {
  return combineReducers(applicationReducers);
}