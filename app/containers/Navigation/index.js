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
		console.log('navigation state is', props.navigationState);

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
		console.log('rendering scene', props.navigationState);

		if (props.scene.navigationState.key === 'welcome') {
			return (
				<View>
					<Text>-------------------------------------</Text>
					<Text>Welcome to the app</Text>
					<TouchableHighlight onPress={() => {
						props.onNavigate({
							type: 'push',
							route: {
								key: 'main',
								title: 'Main Screen',
								showBackButton: false,
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

		if (props.scene.navigationState.key === 'main') {
			const simpleIcon = {
				uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==',
				scale: 3
			};
			const appTabs = [
				{key: 'one', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Feed'},
				{key: 'two', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Maps'},
				{key: 'three', icon: simpleIcon, selectedIcon: simpleIcon, title: 'Notifications'}
			];

			return (
				<View style={{marginTop: NavigationHeader.HEIGHT, flex: 1}}>
					<ApplicationTabs onNavigate={ props.onNavigate }
						navigationState={{ children: appTabs, index: 0 }} />
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
