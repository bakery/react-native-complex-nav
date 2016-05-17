/*
*
* Navigation
*
*/

import React, { Component, View, Text, TabBarIOS,
	NavigationExperimental, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import ReduxNavigationRootContainer from './ReduxNavigationRootContainer';
import navigationReducer from './reducer';
const {
	Header: NavigationHeader,
	CardStack: NavigationCardStack
} = NavigationExperimental;
import NavigationHeaderBackButton from './NavigationHeaderBackButton';
import NavigationHeaderCloseButton from './NavigationHeaderCloseButton';
import ApplicationTabs from '../../components/ApplicationTabs';

class Navigation extends Component {
	_renderNavigation(navigationState, onNavigate) {
		return (
			<NavigationCardStack
				direction={'vertical'}
				navigationState={navigationState}
				onNavigate={onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
			/>
		);
	}

	_renderHeader(props) {
		const currentRoute = props.navigationState.children[
			props.navigationState.index
		];

		if (currentRoute.title) {
			return (
				<NavigationHeader
					{...props}
					renderTitleComponent={this._renderTitleComponent.bind(this)}
					renderLeftComponent={this._renderLeftComponent.bind(this)}
					renderRightComponent={this._renderRightComponent.bind(this)}
				/>
			);
		}

		return null;
	}

	_renderTitleComponent(props) {
		const currentRoute = props.navigationState.children[
			props.navigationState.index
		];
		return (
			<NavigationHeader.Title>{currentRoute.title}</NavigationHeader.Title>
		);
	}

	_renderLeftComponent(props) {
		if (props.scene.index === 0) {
			return null;
		}
		return (
			<NavigationHeaderBackButton onNavigate={props.onNavigate} />
		);
	}

	_renderRightComponent(props) {
		if (props.scene.index === 0) {
			return null;
		}
		return (
			<NavigationHeaderCloseButton onNavigate={props.onNavigate} />
		);
	}

	_renderScene(props) {
		if (props.scene.navigationState.key === 'welcome') {
			return (
				<View>
					<Text>-------------------------------------</Text>
					<Text>Welcome to the app</Text>
				</View>
			);
		}

		if (props.scene.navigationState.key === 'ApplicationTabs') {
			console.log('rendering application tabs');
			return (
				<View style={{flex: 1}}>
					<ApplicationTabs onNavigate={ props.onNavigate }
						navigationState={props.scene.navigationState} />
				</View>
			);
		}
	}

	render() {
		return (
			<ReduxNavigationRootContainer
			reducer={navigationReducer}
			ref={navRootContainer => { this.navRootContainer = navRootContainer; }}
			renderOverlay={this._renderHeader}
			renderNavigation={this._renderNavigation.bind(this)} />
		);
	}
}

export default Navigation;
