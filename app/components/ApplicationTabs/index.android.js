import { View, Text, TouchableHighlight } from 'react-native';
import React, { Component } from 'react';
import DrawerLayoutAndroid from 'DrawerLayoutAndroid';
import ToolbarAndroid from 'ToolbarAndroid';
import styles from './styles';
import Feed from '../Feed';
import { connect } from 'react-redux';
import { jumpTo } from '../../lib/navigation/actions';

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
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

		const { navigation } = this.props;

		const navigationView = (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				{this.props.navigation.routes.map( (t, i) => {
					return (
						<TouchableHighlight
							onPress={ () => onNavigate(jumpTo(navigation.key, i)) }
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
		const selectedTab = this.props.navigation.routes[this.props.navigation.index];
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
