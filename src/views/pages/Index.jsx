"use babel";

import React from 'react';
import store from 'store';

// import stores from 'statics/src/views/stores';
// import actions from 'statics/src/views/actions';
// import buttons from 'statics/src/views/components/buttons';
// import forms from 'statics/src/views/components/forms';

class Index extends React.Component {
	constructor(props){
		super(props);
// 		this._changeMessage = this._changeMessage.bind(this);
// 		this._changeButtons = this._changeButtons.bind(this);
// 		this._changeVerified = this._changeVerified.bind(this);
//
// 		this.state = {
// 			isShowForm: stores.message.getState().isShowForm
// ,			isEditable: stores.buttons.getState().isEditable
// ,			editableMessageId: stores.buttons.getState().editableMessageId
// ,			isVerified: stores.verified.getState().isVerified
// ,			isDeviceRegisterd: stores.verified.getState().isDeviceRegisterd
		// };
	}

// 	componentDidMount(){
// 		stores.message.listen(this._changeMessage);
// 		stores.buttons.listen(this._changeButtons);
// 		stores.verified.listen(this._changeVerified);
// 		if(!store.get('token')){
// 			window.location.assign('/#/account/login');
// 		}else{
// 			actions.verified();
// 		}
// 	}
//
// 	componentDidUpdate(){
// 		if(!this.state.isDeviceRegisterd){
// 			window.location.assign('/#/device');
// 		}
// 	}
//
// 	_changeMessage(){
// 		this.setState({
// 			isShowForm: stores.message.getState().isShowForm
// 		});
// 	}
//
// 	_changeButtons(){
// 		this.setState({
// 			isEditable: stores.buttons.getState().isEditable
// ,			editableMessageId: stores.buttons.getState().editableMessageId
// 		});
// 	}
//
// 	_changeVerified(){
// 		this.setState({
// 			isVerified: stores.verified.getState().isVerified
// ,			isDeviceRegisterd: stores.verified.getState().isDeviceRegisterd
// 		});
// 	}

	render(){
		return (
			<div>
				Hello, JSX!
			</div>
		);
	}
}

export default Index;
