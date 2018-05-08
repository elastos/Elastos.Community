import React from 'react';

import {Link, NavLink} from 'react-router-dom';
import I18N from '@/I18N';

export const AppHeader = class extends React.Component {
	render(){
		const lang = I18N.getLang();

		const changeLang = (l)=>{
			localStorage.setItem('lang', l);
			location.reload(true);
		};
		return (
			<div></div>
		);
	}
};



