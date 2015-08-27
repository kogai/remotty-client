"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var server = express();

// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'jade');

// server.use(logger('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

// server.use('/', routes);
// server.use('/account', account);


// catch 404 and forward to error handler
server.use(function(req, res, next) {
	'use strict';
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
// will print stacktrace
server.use(function(err, req, res, next) {
	'use strict';
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = server;
