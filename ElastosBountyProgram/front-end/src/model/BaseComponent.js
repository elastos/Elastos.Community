import React from 'react';
import _ from 'lodash';


export default class extends React.Component{
	constructor(p){
		super(p);

		this.state = _.extend({

		}, this.defineStates());

		this.init();
	}
	render(){
		const p = this.defineProps();

		return this.renderMain(p);
	}



	init(){}
	renderMain(){return null;}
	defineProps(){}
	defineStates(){
		return {};
	}
};