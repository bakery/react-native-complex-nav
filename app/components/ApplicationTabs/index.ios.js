import { View, Text, TabBarIOS } from 'react-native';
import React, { Component } from 'react';
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

		return <Text>Hello there</Text>;
	}

	render() {
		const { dispatch, navigation } = this.props;
		const children = navigation.routes.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={ () => dispatch(jumpTo(navigation.key, i)) }
						selected={this.props.navigation.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});
		return (
			<TabBarIOS tintColor="black">
				{children}
			</TabBarIOS>
		);
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
export default connect(mapStateToProps, mapDispatchToProps)(ApplicationTabs);
