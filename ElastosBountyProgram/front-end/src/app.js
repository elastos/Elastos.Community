import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import * as ReactRouter from 'react-router';
import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from '@/store';

// import RouterConfig from 'app/config/router';

import './boot';
import './style/index.scss';

import {Button} from 'antd';

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
		<div id="ebp-main">
			<h1>EBP front end1121</h1>
            <Button>Default</Button>
		</div>
	);
};




const render = () => {
	ReactDOM.render(
		(
			<Provider store={Store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		),
		document.getElementById('ebp-root')
	);
};

render();