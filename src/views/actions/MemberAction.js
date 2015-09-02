import Promise from 'bluebird';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import request from 'superagent';

export default {
	getMembers(){
		Dispatcher.dispatch({
			type: Constants.GET_MEMBERS
		});

		request.get('/user/all')
		.query({
			team_id: 1
		})
		.end((error, retrieved) => {
			if(error){
				return Dispatcher.dispatch({
					type: Constants.GET_MEMBERS_ERROR,
					body: error
				});
			}
			Dispatcher.dispatch({
				type: Constants.GET_MEMBERS_SUCCESS,
				body: retrieved.body
			});
		});
	}
};
