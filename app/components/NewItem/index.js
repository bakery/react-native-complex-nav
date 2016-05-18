/*
 *
 * NewItem
 *
 */

import { View, TouchableHighlight, Image } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

class NewItem extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.buttonContainer}>
					<TouchableHighlight onPress={this.props.onClose}>
						<Image style={styles.button} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

NewItem.propTypes = {
	onClose: React.PropTypes.func.isRequired
};

export default NewItem;
