const React = require('react');
const ReactNative = require('react-native');

const {
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform
} = ReactNative;

type Props = {
	onNavigate: Function
}

const NavigationHeaderCloseButton = (props: Props) => (
	<TouchableOpacity style={styles.buttonContainer} onPress={() => props.onNavigate({type: 'BackAction'})}>
	 <Text style={styles.button}>Close</Text>
	</TouchableOpacity>
);

NavigationHeaderCloseButton.propTypes = {
	onNavigate: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		// height: 24,
		// width: 24,
		margin: Platform.OS === 'ios' ? 10 : 16
	}
});

module.exports = NavigationHeaderCloseButton;
