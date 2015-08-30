"use babel";

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const CHANGE_EVENT = 'change';

// stores
var _teams = [];

var TeamStore = assign({}, EventEmitter.prototype, {
	getState(){
		return {
			teams: _teams
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
		case Constants.GET_TEAMS:
			_teams = [];
			return TeamStore.emitChange();

		case Constants.GET_TEAMS_SUCCESS:
			_teams = action.body;
			return TeamStore.emitChange();

		case Constants.GET_TEAMS_ERROR:
			_teams = [];
			return TeamStore.emitChange();
	}
});

export default TeamStore;
