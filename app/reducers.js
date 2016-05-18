import globalNavigation from './components/GlobalNavigation/reducer';
import tabs from './components/ApplicationTabs/reducer';
import feed from './components/Feed/reducer';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
	globalNavigation: globalNavigation,
	tabs,
	feed
};
export default function createReducer() {
	return combineReducers(applicationReducers);
}
