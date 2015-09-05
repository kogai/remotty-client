"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// stores
let _imgURL = '';
let _name = '';
let _isNameDefault = false;

var OwnIconStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			imgURL: _imgURL,
			name: _name,
			isNameDefault: _isNameDefault
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
	switch(action.type){
		case Constants.UPDATE_IMG_URL:
			_imgURL = action.body;
			OwnIconStore.emitChange();
			break;

		case Constants.GET_ME_SUCCESS:
			_name = action.body.name;
			if(action.body.name === '名前が未入力です'){
				_isNameDefault = true;
			}
			OwnIconStore.emitChange();
			break;

		case Constants.PUT_ME_SUCCESS:
			_isNameDefault = false;
			_name = action.body.name;

			OwnIconStore.emitChange();
			break;
	}
});

export default OwnIconStore;
