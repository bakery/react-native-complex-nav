import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectNavigation from '../../selectors/navigation';

const { RootContainer: NavigationRootContainer } = NavigationExperimental;

class ReduxNavigationRootContainer extends NavigationRootContainer {
	handleNavigation(action) {
		const { dispatch } = this.props;
		dispatch(action);
	}

	render() {
		const navigation = this.props.renderNavigation(
			this.props.navigation,
			this.handleNavigation
		);
		return navigation;
	}
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

export default connect(createSelector(
	selectNavigation,
	(navigation) => ({ navigation })
), mapDispatchToProps)(ReduxNavigationRootContainer);
