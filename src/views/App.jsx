'use babel';

import React from 'react';
import Router from 'react-router';
import { Route, HashLocation } from 'react-router';

import Handler from './Handler.jsx';
import Index from './pages/Index.jsx';

/*
import Account from './pages/Account.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Edit from './pages/Edit.jsx';
import Device from './pages/Device.jsx';
		<Route name='account' path='/account' handler={ Account } />
		<Route name='account-register' path='/account/register' handler={ Register } />
		<Route name='account-login' path='/account/login' handler={ Login } />
		<Route name='account-edit' path='/account/edit' handler={ Edit } />
		<Route name='device' path='/device' handler={ Device } />
*/

const routes = (
	<Route handler={ Handler }>
		<Router.DefaultRoute handler={ Index } />
	</Route>
);

var router = Router.create({
	routes: routes,
	location: HashLocation
});

router.run(function(Root, state){
	React.render(<Root params={ state.params } />, document.getElementById('root'));
});
