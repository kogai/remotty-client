import Promise from 'bluebird';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { connection } from 'src/classes/Database';

export default {
	getMembers(){
		Dispatcher.dispatch({
			type: Constants.GET_MEMBERS
		});

		connection(window)
		.then((database) => {
			Dispatcher.dispatch({
				type: Constants.GET_MEMBERS_SUCCESS,
				body: ['electron-flux', 'atom-flux', 'github-flux']
			});

			/*
			return new Promise((resolve, reject)=>{
				database.find({
					collectionName: 'user',
					query: 'name',
					values: 'kogai'
				}, function(error, results){
					if(error){
						return reject(error);
					}
					resolve(results);
				});
			});
			*/
		})
		.catch((error)=>{
			Dispatcher.dispatch({
				type: Constants.GET_MEMBERS_ERROR,
				body: error
			});
		});
	}
};

/*
			Dispatcher.dispatch({
				type: Constants.GET_MEMBERS_SUCCESS,
				body: database
			});

*/
