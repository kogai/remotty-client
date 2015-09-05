import request from 'superagent';
import store from 'store';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { account } from 'src/views/classes/Account';

export function updatePhoto (imgURL){
	Dispatcher.dispatch({
		type: Constants.UPDATE_IMG_URL,
		body: imgURL
	});
}

export function updateProfile(update){
	request
		.put('/member/' + store.get('own_token'))
		.send(update)
		.end((error, retrieved)=>{
			if(error){
				return Dispatcher.dispatch({
					type: Constants.PUT_ME_ERROR,
					body: error
				});
			}
			return Dispatcher.dispatch({
				type: Constants.PUT_ME_SUCCESS,
				body: update
			});
		});
}

export function getOwnName(own_token){
	Dispatcher.dispatch({
		type: Constants.GET_ME
	});

	request
		.get('/member/' + own_token)
		.end((error, retrieved) => {
			if(retrieved.status === 404){
				// アカウントが見つからなかったら新規作成
				return account.create()
					.then((newMember)=>{
						Dispatcher.dispatch({
							type: Constants.GET_ME_SUCCESS,
							body: newMember
						});
					})
					.catch((error)=>{
						Dispatcher.dispatch({
							type: Constants.GET_ME_ERROR,
							body: error
						});
					});
			}

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
