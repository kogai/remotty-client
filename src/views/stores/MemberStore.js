import { EventEmitter } from 'events';
import assign from 'object-assign';
import _ from 'lodash';
import Base64 from 'js-base64';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

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

function updateSomeOne(data, currentMembers){
	let updatedMembers = currentMembers.map((member)=>{
		if(member.own_token === data.own_token){
			member.imgsrc = "data:image/jpeg;base64, " + data.imgBlob;
		}
		return member;
	});

	return updatedMembers;
}

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

		case Constants.UPDATE_SOMEONE_IMG:
			_members = updateSomeOne(action.body, _members);
			return MemberStore.emitChange();
	}
});

export default MemberStore;
