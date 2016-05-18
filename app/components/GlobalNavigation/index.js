/*
 *
 * GlobalNavigation
 *
 */

import { View, NavigationExperimental } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import { connect } from 'react-redux';
import ApplicationTabs from '../ApplicationTabs';
import NewItem from '../NewItem';
const { CardStack: NavigationCardStack } = NavigationExperimental;

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

		if (props.scene.navigationState.key === 'new') {
			return (
				<View style={{flex: 1}}>
					<NewItem onClose={this._onCloseNewItem.bind(this)} />
				</View>
			);
		}
	}

	_renderTitleComponent(props) {
		return null;
	}

	_onCloseNewItem() {
		this.props.onNavigate({
			type: 'BackAction'
		});
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
