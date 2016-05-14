/*
 *
 * App
 *
 */

import React, { Component, View } from 'react-native';
import styles from './styles';
import Navigation from '../../containers/Navigation';

class App extends Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <Navigation />
      </View>
    );
  }
}


export default App;
