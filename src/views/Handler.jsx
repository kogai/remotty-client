"use babel";

import React from 'react';
import { RouteHandler, Link } from 'react-router';
import store from 'store';
import uuid from 'uuid';

class Handler extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			height: 0,
			width: 0
		};
	}

	componentDidMount(){
		window.addEventListener('load', ()=>{
			this.setState({
				height: window.innerHeight,
				width: window.innerWidth
			});
		});

		window.addEventListener('resize', ()=>{
			this.setState({
				height: window.innerHeight,
				width: window.innerWidth
			});
		});
	}

	render(){
		let style = {
			height: this.state.height,
			width: this.state.width
		};
		return (
			<div style={ style } >
				<RouteHandler />
			</div>
		);
	}
}

export default Handler;
