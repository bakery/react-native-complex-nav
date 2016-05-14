import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import selectNavigation from '../../selectors/navigation';
const { Reducer: NavigationReducer } = NavigationExperimental;
const { JumpToAction } = NavigationReducer.TabsReducer;

const { RootContainer: NavigationRootContainer } = NavigationExperimental;

class ReduxNavigationRootContainer extends NavigationRootContainer {
	handleNavigation(tabIndex) {
		const { dispatch } = this.props;
		dispatch(JumpToAction(tabIndex));
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
