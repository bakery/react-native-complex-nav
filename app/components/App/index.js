/*
 *
 * App
 *
 */

import React, { Component, View } from 'react-native';
import styles from './styles';
import GlobalNavigation from '../../containers/GlobalNavigation';

class App extends Component {
	render() {
		return (
			<View style={styles.appContainer}>
				<GlobalNavigation />
			</View>
		);
	}
}


export default App;
