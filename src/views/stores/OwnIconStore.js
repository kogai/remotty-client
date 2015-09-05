"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// stores
var _imgURL = '/images/icon.png';
var _name = '名前が未入力です';

var OwnIconStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			imgURL: _imgURL,
			name: _name
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

		case Constants.GET_ME_SUCCESS:
			// _imgURL = action.body.imgURL;
			_name = action.body.name;
			OwnIconStore.emitChange();
	}
});

export default OwnIconStore;
