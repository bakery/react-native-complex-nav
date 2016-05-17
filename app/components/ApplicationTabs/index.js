import React, { Component, View, Text, TouchableHighlight, Image,
	TabBarIOS, NavigationExperimental } from 'react-native';
import styles from './styles';
import Feed from '../Feed';

const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

class ApplicationTabs extends Component {
	_renderTabContent(tab) {
		// XX: replace this with code to render specific components/containers
		// corresponding to tabs in your app, e.g.
		// if (tab.key === 'maps') {
		//   return <MapView />;
		// }

		if (tab.key === 'notifs') {
			return (
				<Feed navigationState={tab} onNavigate={this.props.onNavigate} />
			);
		}

		return (
			<View style={[styles.tabContent, {backgroundColor: 'green'}]}>
				<TouchableHighlight onPress={() => {
					this.props.onNavigate({
						type: 'push',
						parent: tab.key,
						route: {
							key: 'welcome',
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

	render() {
		const children = this.props.navigationState.children.map( (tab, i) => {
			return (
				<TabBarIOS.Item key={tab.key}
						icon={tab.icon}
						selectedIcon={tab.selectedIcon}
						title={tab.title} onPress={
							() => this.props.onNavigate(JumpToAction(i))
						}
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
