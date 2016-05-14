import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createReducer from './reducers';
import sagaMiddleware from 'redux-saga';
import sagas from './sagas';
import devTools from 'remote-redux-devtools';

function configureStore(initialState = fromJS({})) {
	// const enhancer = compose(devTools());
	// return createStore(createReducer(), initialState, enhancer);

  const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware(...sagas)),
    devTools()
  )(createStore);
  return createStoreWithMiddleware(createReducer(), initialState);
}

module.exports = configureStore;
