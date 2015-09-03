import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

import { connection } from 'src/views/classes/Database';

export default {
	getTeams(){
		Dispatcher.dispatch({
			type: Constants.GET_TEAMS
		});

		connection(window)
		.then((database) => {
			Dispatcher.dispatch({
				type: Constants.GET_TEAMS_SUCCESS,
				body: ['electron-team', 'atom-team', 'github-team']
			});
		})
		.catch((error)=>{
			Dispatcher.dispatch({
				type: Constants.GET_TEAMS_ERROR,
				body: error
			});
		});
	},

	changeSelect(selected){
		console.log(selected);
	}
};
