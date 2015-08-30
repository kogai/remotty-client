"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

var _isKeycreated = false;

var MemberStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			isKeycreated: _isKeycreated
,			isDeviceRegisterd: _isDeviceRegisterd
		};
	},

	emitChange(){
		this.emit(CHANGE_EVENT);
	},

	listen(callback){
		this.on(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action){
	// switch(action.type){
	// 	case Constants.DEVICE_START:
	// 		_message = '準備中...';
	// 		MemberStore.emitChange();
	// 		break;
	// }
});

export default MemberStore;
