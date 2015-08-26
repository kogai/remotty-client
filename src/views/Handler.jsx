"use babel";

import React from 'react';
// import { Card } from 'belle';
import { RouteHandler, Link } from 'react-router';
// import menus from 'statics/src/views/components/menus';
// import actions from 'statics/src/views/actions';
// import stores from 'statics/src/views/stores';

var headerStyle = {
	"background": 'transparent'
,	"padding": "auto"
,	"marginBottom": 0
,	"boxShadow": "none"
};

class Handler extends React.Component {
	constructor(props){
		super(props);
		// this._change = this._change.bind(this);
// 		this.state = {
// 			isMenuOpen: stores.menus.getState().isMenuOpen
// ,			windowHeight: 0
// 		};
	}

	// componentDidMount(){
	// 	stores.menus.listen(this._change);
	// 	this.setState({
	// 		windowHeight: window.innerHeight
	// 	});
	// }
	//
	// _change(){
	// 	this.setState({
	// 		isMenuOpen: stores.menus.getState().isMenuOpen
	// 	});
	// }
	//
	// _openMenu(){
	// 	actions.menus.open();
	// }
	//
	// _closeMenu(){
	// 	actions.menus.close();
	// }

	render(){
		return (
			<RouteHandler />
		);
	}
}

export default Handler;
