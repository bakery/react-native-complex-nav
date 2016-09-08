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
import { actions } from 'react-native-navigation-redux-helpers';

const {
  popRoute
} = actions;

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

class GlobalNavigation extends Component {
	constructor(props) {
		super(props);

		this._renderHeader = this._renderHeader.bind(this);
		this._renderScene = this._renderScene.bind(this);
	}

	render() {
		return (
      <NavigationCardStack
        onNavigate={ () => {} }
        style={styles.main}
        navigationState={this.props.navigation}
        renderHeader={this._renderHeader}
        renderScene={this._renderScene}
      />
		);
	}

	_renderScene(props) {
		if (props.scene.route.key === 'applicationTabs') {
			return (
				<View style={{flex: 1}}>
					<ApplicationTabs />
				</View>
			);
		}

		if (props.scene.route.key === 'new') {
			return (
				<View style={{flex: 1}}>
					<NewItem onClose={this._onCloseNewItem.bind(this)} />
				</View>
			);
		}
	}

	_renderHeader(props) {
    return null;
  }

	_onCloseNewItem() {
    const { dispatch, navigation } = this.props;
    dispatch(popRoute(navigation.key));
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		onNavigate() {
			console.log('@@ onNavigate', arguments);
		}
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('globalNavigation')
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNavigation);
