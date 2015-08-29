"use babel";

import React from 'react';
import { RouteHandler, Link } from 'react-router';

class Handler extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let style = {
			height: window.innerHeight,
			width: window.innerWidth
		};
		return (
			<div style={ style } >
				<RouteHandler />
			</div>
		);
	}
}

export default Handler;
