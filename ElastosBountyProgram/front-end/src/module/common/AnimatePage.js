import React from 'react';
import BaseComponent from 'app/model/BaseComponent';
import {spring, Motion} from 'react-motion';
import _ from 'lodash';

/*
	noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  gentle: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
 */
const springConfig = {stiffness: 180, damping: 14};


export default class extends BaseComponent{
	defineStats(){
		return {

		};
	}


	targetStyle(tar){
		return {
			// transform: `translated3d(0, ${tar.top}px, 0) scale(1)`,
			position: 'relative',
			opacity: tar.value_1,
			left: tar.value_2
		};
	}

	renderMain(p){

		const mp = {
			defaultStyle : {
				value_1 : 0,
				value_2 : 50
			},
			style : {
				value_1 : spring(1, springConfig),
				value_2 : spring(0, springConfig)
			}
		};

		return (
			<Motion {...mp}>
				{
					(tar)=>{
						return (<div style={this.targetStyle(tar)}>{this.renderPage(p)}</div>);
					}
				}
			</Motion>
		);

	}

	renderPage(){
		return null;
	}


}
