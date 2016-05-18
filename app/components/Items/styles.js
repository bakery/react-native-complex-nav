import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	textContainer: {
		flex: 1,
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 2,
	},
	row: {
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'row',
		padding: 5,
	},
	cellImage: {
		backgroundColor: '#dddddd',
		height: 60,
		marginRight: 10,
		width: 60,
	},
	cell: {
		borderBottomWidth: StyleSheet.hairlineWidth
	}
});
