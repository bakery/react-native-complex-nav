import globalNavigation from './containers/GlobalNavigation/reducer';
import tabs from './components/ApplicationTabs/reducer';
import feed from './components/Feed/reducer';
import { combineReducers } from 'redux-immutable';
// XX: Do not rename this variable if you want reducer generator
// to keep working properly (and you do want that, right?)
const applicationReducers = {
	globalNavigation: globalNavigation,
	tabs,
	feed
};
export default function createReducer() {
	return combineReducers(applicationReducers);
}
