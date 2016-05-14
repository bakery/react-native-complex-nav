import App from './components/App';
import React from 'React';
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

function setup() {
  class Root extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
