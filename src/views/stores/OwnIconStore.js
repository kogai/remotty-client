"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// stores
var _imgURL = '/images/icon.png';

var TeamStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			imgURL: _imgURL
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
			TeamStore.emitChange();
	}
});

export default TeamStore;
