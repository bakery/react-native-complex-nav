/*
 *
 * App
 *
 */

import { View } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';
import GlobalNavigation from '../GlobalNavigation';

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
