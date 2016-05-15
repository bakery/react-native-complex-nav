/*
*
* Navigation reducer
*
*/

// import { NavigationExperimental } from 'react-native';
//
// const { Reducer: NavigationReducer } = NavigationExperimental;
//
// // XX: For details on how to add fancy icons to your app, refer to this:
// // https://facebook.github.io/react-native/docs/image.html#static-resources
// const simpleIcon = {
// 	uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==',
// 	scale: 3
// };
//
// // XX: Define your tabs here
// const tabs = [
// 	{key: 'one', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Feed'},
// 	{key: 'two', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Maps'},
// 	{key: 'three', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Notifications'}
// ];
//
// const navigation = NavigationReducer.TabsReducer({
// 	tabReducers: tabs.map( t => {
// 		return (lastRoute) => lastRoute || t;
// 	})
// });
//
// export default navigation;

const ReactNative = require('react-native');

const {
	NavigationExperimental,
} = ReactNative;

const {
	StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initial = {
	index: 0,
	key: 'app',
	children: [
		{key: 'welcome'}
	],
};

const CardStackExampleReducer = (currentState = initial, action) => {
	switch (action.type) {
		case 'RootContainerInitialAction':
			return currentState;

		case 'push':
			return NavigationStateUtils.push(currentState, action.route);

		case 'BackAction':
		case 'back':
		case 'pop':
			return currentState.index > 0 ?
				NavigationStateUtils.pop(currentState) :
				currentState;

		default:
			return currentState;
	}
};

export default CardStackExampleReducer;
