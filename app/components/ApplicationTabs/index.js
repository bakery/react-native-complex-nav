import React, { Component, View, Text, TabBarIOS } from 'react-native';
import styles from './styles';

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		// XX: replace this with code to render specific components/containers
		// corresponding to tabs in your app, e.g.
		// if (tab.key === 'maps') {
		//   return <MapView />;
		// }

		return (
			<View style={[styles.tabContent, {backgroundColor: 'green'}]}>
				<Text>Tab {tab.key} content</Text>
			</View>
		);
	}

	render() {
		const children = this.props.navigationState.children.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={() => this.props.onNavigate(i) }
						selected={this.props.navigationState.index === i}>
						{ this._renderTabContent(tab) }
				</TabBarIOS.Item>
			);
		});
		return (
			<TabBarIOS tintColor="white" barTintColor="darkslateblue">
				{children}
			</TabBarIOS>
		);
	}
}

ApplicationTabs.propTypes = {
	onNavigate: React.PropTypes.func.isRequired,
	navigationState: React.PropTypes.object.isRequired
};

export default ApplicationTabs;
