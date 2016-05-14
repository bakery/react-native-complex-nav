/*
*
* Navigation
*
*/

import React, { Component, View, Text, TabBarIOS } from 'react-native';
import styles from './styles';
import ReduxNavigationRootContainer from './ReduxNavigationRootContainer';
import navigationReducer from './reducer';

class Navigation extends Component {
	_renderTabs(navigationState, onNavigate) {
		const children = navigationState.children.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={() => onNavigate(i) }
						selected={navigationState.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});
		return (
			<TabBarIOS tintColor="white" barTintColor="darkslateblue">
				{children}
			</TabBarIOS>
		);
	}

	_renderTabContent(tab) {
		// XX: replace this with code to render specific components/containers
		// corresponding to tabs in your app, e.g.
		// if (tab.key === 'maps') {
		//   return <MapView />;
		// }

		return (
			<View style={[styles.tabContent, {backgroundColor: 'green'}]}>
				<Text>Tab {tab.key} content</Text>
			</View>
		);
	}

	render() {
		return (
			<ReduxNavigationRootContainer
			reducer={navigationReducer}
			ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
			renderNavigation={this._renderTabs.bind(this)} />
		);
	}
}

export default Navigation;
