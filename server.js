"use strict";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var server = express();
var routes = require('./global/routes');

// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'jade');

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(routes);

/*
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
	res.send(err);
});
*/

module.exports = server;

if(true){
  server.listen(4444, function() {
  	console.log('Express server listening on port 4444');
  });
}
