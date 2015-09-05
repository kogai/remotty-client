import request from 'superagent';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import request from 'superagent';

export function updatePhoto (imgURL){
	Dispatcher.dispatch({
		type: Constants.UPDATE_IMG_URL,
		body: imgURL
	});
}

export function getOwnName(own_token){
	Dispatcher.dispatch({
		type: Constants.GET_ME
	});

	request.get('/me/' + own_token)
		.end((error, retrieved) => {
			if(error){
				return Dispatcher.dispatch({
					type: Constants.GET_ME_ERROR,
					body: error
				});
			}
			Dispatcher.dispatch({
				type: Constants.GET_ME_SUCCESS,
				body: retrieved.body
			});
		});
}
