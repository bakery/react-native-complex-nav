/*
*
* Feed
*
*/

import React, { Component, View, Text,
	NavigationExperimental, TouchableHighlight, Image } from 'react-native';
	import styles from './styles';
	const {
		Header: NavigationHeader,
		CardStack: NavigationCardStack
	} = NavigationExperimental;
	import NavigationHeaderBackButton from '../../containers/Navigation/NavigationHeaderBackButton';
	import NavigationHeaderCloseButton from '../../containers/Navigation/NavigationHeaderCloseButton';

	class Feed extends Component {
		render() {
			return (
				<View style={styles.feed}>
					<NavigationCardStack
					direction={'vertical'}
					navigationState={this.props.navigationState}
					onNavigate={this._onNavigate}
					renderScene={this._renderScene.bind(this)}
					renderOverlay={this._renderHeader.bind(this)}
					style={styles.main}
					/>
				</View>
			);
		}

		_onNavigate(action) {
			action.parent = this.props.navigationState.key;
			this.props.onNavigate(action);
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
			if (props.scene.navigationState.showBackButton) {
				return (
					<NavigationHeaderBackButton onNavigate={this._onNavigate.bind(this)} />
				);
			}
			return null;
		}

		_renderRightComponent(props) {
			if (props.scene.navigationState.showCloseButton) {
				return (
					<NavigationHeaderCloseButton onNavigate={this._onNavigate.bind(this)} />
				);
			}
			return null;
		}

		_renderScene(props) {
			if (props.scene.navigationState.key === 'base') {
				return (
					<View style={{marginTop: NavigationHeader.HEIGHT}}>
						<TouchableHighlight onPress={() => {
							this._onNavigate({
								type: 'push',
								parent: props.navigationState.key,
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
					</View>
				);
			}

			if (props.scene.navigationState.key === 'welcome') {
				return (
					<View style={{marginTop: NavigationHeader.HEIGHT}}>
						<Text>Welcome welcome</Text>
					</View>
				);
			}
		}
	}

	Feed.propTypes = {
		onNavigate: React.PropTypes.func.isRequired,
		navigationState: React.PropTypes.object.isRequired
	};

	export default Feed;
