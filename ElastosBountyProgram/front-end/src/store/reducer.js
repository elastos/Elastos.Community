import { combineReducers } from 'redux';


const default_state = {
	init: false
};

const appReducer = (state = default_state, action)=>{
	switch (action.type) {

	}

	return state;
};

export default combineReducers({
	app: appReducer,
});