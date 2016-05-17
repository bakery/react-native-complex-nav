/*
*
* Feed
*
*/

import React, { Component, View, Text,
	NavigationExperimental, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
const { Header: NavigationHeader, CardStack: NavigationCardStack } = NavigationExperimental;
// import NavigationHeaderBackButton from '../../containers/Navigation/NavigationHeaderBackButton';
// import NavigationHeaderCloseButton from '../../containers/Navigation/NavigationHeaderCloseButton';

class Feed extends Component {
	render() {
		return (
			<View style={styles.feed}>
				<NavigationCardStack
				direction={'vertical'}
				navigationState={this.props.navigation}
				onNavigate={this._onNavigate}
				renderScene={this._renderScene.bind(this)}
				renderOverlay={this._renderHeader.bind(this)}
				style={styles.main}
				/>
			</View>
		);
	}

	_renderHeader(props) {
		// const currentRoute = props.navigationState.children[
		// 	props.navigationState.index
		// ];
		//
		// if (currentRoute.title) {
		// 	return (
		// 		<NavigationHeader
		// 		{...props}
		// 		renderTitleComponent={this._renderTitleComponent.bind(this)}
		// 		renderLeftComponent={this._renderLeftComponent.bind(this)}
		// 		renderRightComponent={this._renderRightComponent.bind(this)}
		// 		/>
		// 	);
		// }

		return null;
	}

	_renderTitleComponent(props) {
		// const currentRoute = props.navigationState.children[
		// 	props.navigationState.index
		// ];
		// return (
		// 	<NavigationHeader.Title>{currentRoute.title}</NavigationHeader.Title>
		// );
		return null;
	}

	_renderLeftComponent(props) {
		// if (props.scene.navigationState.showBackButton) {
		// 	return (
		// 		<NavigationHeaderBackButton onNavigate={this._onNavigate.bind(this)} />
		// 	);
		// }
		return null;
	}

	_renderRightComponent(props) {
		// if (props.scene.navigationState.showCloseButton) {
		// 	return (
		// 		<NavigationHeaderCloseButton onNavigate={this._onNavigate.bind(this)} />
		// 	);
		// }
		return null;
	}

	_renderScene(props) {
		if (props.scene.navigationState.key === 'list') {
			return (
				<View style={{marginTop: NavigationHeader.HEIGHT}}>
					<TouchableHighlight onPress={() => {
						this.props.onNavigate({
							type: 'push',
							route: {
								key: 'welcome',
								title: 'Main Screen',
								showBackButton: true,
								showCloseButton: true
							}
						});
					}}>
						<Image style={{width: 15,height: 15}}
							source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
						/>
					</TouchableHighlight>
					<Text>------------------</Text>
					<TouchableHighlight onPress={() => {
						this.props.onNavigate({
							type: 'push',
							scope: 'global',
							route: {
								key: 'welcome',
								title: 'Main Screen'
							}
						});
					}}>
						<Image style={{width: 15,height: 15}}
							source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
						/>
					</TouchableHighlight>
				</View>
			);
		}

		if (props.scene.navigationState.key === 'welcome') {
			return (
				<View style={{flex: 1, backgroundColor: 'red'}}>
					<Text>Welcome welcome</Text>
				</View>
			);
		}
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('feed')
	};
}

export default connect(mapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, stateProps, dispatchProps, {
		onNavigate: (action) => {
			dispatchProps.dispatch(Object.assign(action, {
				scope: action.scope || stateProps.navigation.key
			}));
		}
	});
})(Feed);
