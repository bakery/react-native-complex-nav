import { NavigationExperimental } from 'react-native';
import { PUSH_ROUTE, BACK } from '../../lib/navigation/constants';

const { StateUtils } = NavigationExperimental;

const initialState = {
	key: 'feed',
	index: 0,
	routes: [
		{
			key: 'list',
			title: 'Items'
		},
	],
};

module.exports = (state = initialState, action) => {
	if (action.payload && action.payload.key !== initialState.key) {
    return state;
  }

	switch (action.type) {
		case PUSH_ROUTE:
			return StateUtils.push(state, action.payload.route);
		case BACK:
			return StateUtils.pop(state);
		default:
			return state;
	}
};
