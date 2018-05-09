import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import config from '@/config';

import reducer from './reducer';
import action from './action';


const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({})),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	),
);
store.actions = action;

if(config.NODE_ENV === 'development'){
    global.store = store;
}

export default store;