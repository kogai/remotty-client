"use babel";

import React from 'react';
import { RouteHandler, Link } from 'react-router';
import store from 'store';
import uuid from 'uuid';

class Handler extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		/*
		if(store.get('own_token')){

			return;
		}
		// ユーザー作成処理
		const ownToken = uuid.v1();
		store.set('own_token', own_token);
		*/
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
