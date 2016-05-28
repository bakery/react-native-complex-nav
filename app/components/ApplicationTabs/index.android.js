import { View, Text, TouchableHighlight, Image, NavigationExperimental } from 'react-native';
import React, { Component } from 'react';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import styles from './styles';
import Feed from '../Feed';
import { connect } from 'react-redux';
const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		// XX: replace this with code to render specific components/containers
		// corresponding to tabs in your app, e.g.
		// if (tab.key === 'maps') {
		//   return <MapView />;
		// }

		if (tab.key === 'feed') {
			return (
				<Feed />
			);
		}

		if (tab.key === 'notifications') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'green'}]} />
			);
		}

		if (tab.key === 'settings') {
			return (
				<View style={[styles.tabContent, {backgroundColor: 'pink'}]} />
			);
		}
	}

	render() {
		const onNavigate = (action) => {
			this.drawer.closeDrawer();
			this.props.onNavigate(action);
		};

		const navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				{this.props.navigation.children.map( (t, i) => {
					return (
						<TouchableHighlight
							onPress={ () => onNavigate(JumpToAction(i)) }
							key={ t.key }>
							<Text>{ t.title }</Text>
						</TouchableHighlight>
					);
				})}
			</View>
		);

		return (
			<DrawerLayoutAndroid
				ref={(drawer) => { this.drawer = drawer; }}
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}>
				{this._renderApp()}
			</DrawerLayoutAndroid>
		);
	}

	_renderApp() {
		const selectedTab = this.props.navigation.children[this.props.navigation.index];
		const actions = [{
			title: 'New Item',
			icon: { uri: 'http://facebook.github.io/react/img/logo_og.png' },
			show: 'always',
			showWithText: false
		}];
		return (
			<View style={{ flex: 1 }}>
				<ToolbarAndroid
				 navIcon={require('./img/hamburger.png')}
				 actions={actions}
				 onIconClicked={() => this.drawer.openDrawer()}
				 style={styles.toolbar}
				 title={selectedTab.title}
				 onActionSelected={this._onActionSelected.bind(this)}
				/>
				{this._renderTabContent(selectedTab)}
			</View>
		);
	}

	_onActionSelected(position) {
		if (position === 0) {
			this.props.onNavigate({
				type: 'push',
				scope: 'global',
				route: {
					key: 'new',
					title: 'Main Screen',
					showBackButton: true
				}
			});
		}
	}
}

// <View style={{flex: 1, alignItems: 'center'}}>
//   <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
//   <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
// </View>


function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

function mapStateToProps(state) {
	return {
		navigation: state.get('tabs')
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
})(ApplicationTabs);
