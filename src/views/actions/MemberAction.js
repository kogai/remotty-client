"use babel";

import request from 'superagent';

import Dispatcher from 'src/views/Dispatcher.jsx';
import Constants from 'src/views/Constants';

export default () => {
		Dispatcher.dispatch({
			type: Constants.EDIT_START
		});
};
