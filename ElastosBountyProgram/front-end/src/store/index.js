import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';


const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({})),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	),
);

export default store;