/*
 *
 * GlobalNavigation
 *
 */

import { View, Text,
	NavigationExperimental, TouchableHighlight, Image } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import ApplicationTabs from '../../components/ApplicationTabs';
const {
	Header: NavigationHeader,
	CardStack: NavigationCardStack
} = NavigationExperimental;

class GlobalNavigation extends Component {
	render() {
		return (
			<NavigationCardStack
				direction={'vertical'}
				navigationState={this.props.navigation}
				onNavigate={this.props.onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
			/>
		);
	}

	_renderHeader(props) {
		return null;
	}

	_renderScene(props) {
		if (props.scene.navigationState.key === 'applicationTabs') {
			return (
				<View style={{flex: 1}}>
					<ApplicationTabs />
				</View>
			);
		}

		if (props.scene.navigationState.key === 'welcome') {
			return (
				<View style={{flex: 1}}>
					<Text>@@@@@@@@@@@@@@@@@@@@@@@@</Text>
					<Text>Super warm welcome</Text>
				</View>
			);
		}

		return (
			<View>
				<Text>-------------------------------------</Text>
				<Text>Welcome to the app</Text>
			</View>
		);
	}

	_renderTitleComponent(props) {
		return null;
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('globalNavigation')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, dispatchProps, stateProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(
				Object.assign(action, {
					scope: stateProps.navigation.key
				})
			);
		}
	});
})(GlobalNavigation);
