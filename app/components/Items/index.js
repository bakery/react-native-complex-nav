/*
 *
 * Items
 *
 */

import { View, Text, TouchableHighlight, Image, ScrollView } from 'react-native';
import React, { Component } from 'react';
import styles from './styles';

const data = [
	{
		key: '1',
		title: 'Hello 1',
		description: 'Description',
	},
	{
		key: '2',
		title: 'Hello 2',
		description: 'Description 2',
	},
	{
		key: '3',
		title: 'Hello3',
		description: 'Description 3',
	},
	{
		key: '4',
		title: 'Hello4',
		description: 'Description 4',
	},
	{
		key: '5',
		title: 'Hello5',
		description: 'Description 5',
	},
	{
		key: '6',
		title: 'Hello6',
		description: 'Description 6',
	},
	{
		key: '7',
		title: 'Hello7',
		description: 'Description 7',
	}
].map(d => Object.assign(d, {
	image: {uri: 'http://facebook.github.io/react/img/logo_og.png'}
}));

class Items extends Component {
	render() {
		const generateItem = (i) => (
			<View style={styles.cell} key={i.key}>
				<TouchableHighlight onPress={this.props.onSelectItem}>
					<View style={styles.row}>
						<Image source={i.image} style={styles.cellImage} />
						<View style={styles.textContainer}>
							<Text style={styles.title} numberOfLines={2}>
								{i.title}
							</Text>
							<Text numberOfLines={1}>
								{i.description}
							</Text>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		);
		return (
			<ScrollView automaticallyAdjustContentInsets={false}>
				{data.map(generateItem)}
			</ScrollView>
		);
	}
}

Items.propTypes = {
	onSelectItem: React.PropTypes.func.isRequired
};

export default Items;
