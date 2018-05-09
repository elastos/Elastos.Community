import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store from '@/store';
import config from '@/config';

import './boot';
import './style/index.scss';

const middleware = (render, props)=>{
	return render;
};

const onEnter = ()=>{

};

const firstChild = (props)=>{
	const childrenArray = React.Children.toArray(props.children);
	return _.first(childrenArray);
};

const App = ()=>{
	return (
		<Switch id="ebp-main">
            {
                _.map(config.router, (item, i)=>{
                    const props = _.omit(item, ['page', 'path', 'type']);
                    const R = item.type || Route;
                    return (
                        <R path={item.path} key={i} exact component={item.page} {...props} />
                    );
                })
            }
		</Switch>
	);
};




const render = () => {
	ReactDOM.render(
		(
			<Provider store={store}>
				<ConnectedRouter history={store.history}>
					<App />
				</ConnectedRouter>
			</Provider>
		),
		document.getElementById('ebp-root')
	);
};

render();