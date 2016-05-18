import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		height: 24,
		width: 24,
		margin: Platform.OS === 'ios' ? 10 : 16,
		resizeMode: 'contain'
	}
});
