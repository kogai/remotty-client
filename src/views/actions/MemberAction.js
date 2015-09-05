import request from 'superagent';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

export default {
	getMembers(){
		Dispatcher.dispatch({
			type: Constants.GET_MEMBERS
		});

		request.get('/member/all')
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
