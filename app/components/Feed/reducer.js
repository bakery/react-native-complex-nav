import ReactNative from 'react-native';
const { NavigationExperimental } = ReactNative;
const { Reducer: NavigationReducer } = NavigationExperimental;

const globalNavigation = NavigationReducer.StackReducer({
	getPushedReducerForAction: (action) => {
		if (action.type === 'push') {
			return (state) => (state || action.route);
		}
		return null;
	},
	initialState: {
		key: 'feed',
		index: 0,
		children: [
			{
				key: 'list'
			},
		],
	},
});

module.exports = (state, action) => {
	if (action.scope && action.scope !== 'feed') {
		return state;
	} else {
		return globalNavigation(state, action);
	}
};
