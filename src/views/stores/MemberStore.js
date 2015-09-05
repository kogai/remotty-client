"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// stores
var _members = [];

var MemberStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			members: _members
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
		case Constants.GET_MEMBERS:
			_members = [];
			return MemberStore.emitChange();

		case Constants.GET_MEMBERS_SUCCESS:
			_members = action.body;
			return MemberStore.emitChange();

		case Constants.GET_MEMBERS_ERROR:
			_members = [];
			return MemberStore.emitChange();
	}
});

export default MemberStore;
