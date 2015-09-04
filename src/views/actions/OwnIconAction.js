import Promise from 'bluebird';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import request from 'superagent';

export function updatePhoto (imgURL){
	Dispatcher.dispatch({
		type: Constants.UPDATE_IMG_URL,
		body: imgURL
	});
}

export function getMe(){
	
}
