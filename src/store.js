import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import todoListApp from './reducers/';

const logger = createLogger();
const reducers = combineReducers({
	todoListApp
});

export default createStore(
	reducers,
	compose(applyMiddleware(thunk, logger))
);